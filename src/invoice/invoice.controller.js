import Cart from "../cart/cart.model.js";
import Product from "../product/product.model.js";
import Invoice from "./invoice.model.js";
import {generateInvoicePDF} from "../helpers/factura-fuctions.js"
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import User from "../user/user.model.js";

const address = dirname(fileURLToPath(import.meta.url));

export const createInvoice = async (req, res) => {
    try {
        const { _id } = req.usuario;

        const cart = await Cart.findOne({ user: _id });
        let totals = 0;
        const invoiceItems = [];

        for (let item of cart.items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).send({ 
                    message: `Product not found (ID: ${item.product})` 
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).send({ 
                    message: `Insufficient stock for ${product.name}` 
                });
            }

            totals += item.quantity * product.price;
            product.stock -= item.quantity;
            product.bestSelling += item.quantity;
            await product.save();

            invoiceItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const invoice = await Invoice.create({
            userId: _id,
            items: invoiceItems,
            totalPrice: totals
        });

        cart.items = [];
        await cart.save();

        const name = await User.findById(invoice.userId)

        const filePath = path.join(address, `../../public/invoices/invoice-${name.name}-${name.surname}-${Date.now()}.pdf`);

        await generateInvoicePDF(invoice, invoiceItems, totals, filePath);

        res.status(200).json({
            success: true,
            message: "Invoice successfully created",
            invoice: invoice,
            pdfUrl: filePath 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message
        });
    }
};

export const editInvoice = async (req, res) => {
    try {
        const { invoiceId, productId, newquantity } = req.body

        const invoice = await Invoice.findById(invoiceId)

        if (!invoice) {
            return res.status(404).json({ 
                message: "Not found" 
            })
        }

        const product = await Product.findById(productId)
        for(let item of invoice.items) {
            if(item.productId == productId){
                if (product.stock < newquantity) {
                    return res.status(400).send({ 
                        message: `Insufficient stock for ${product.name}` 
                    })
                }
                item.quantity = newquantity
                await invoice.save()
                break
            }
        }
        let totals = 0

        for (let updatedItem of invoice.items) {
            const updatedProduct = await Product.findById(updatedItem.productId);
            totals += updatedItem.quantity * updatedProduct.price;
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            invoiceId,
            { totalPrice: totals },
            { new: true }
        )

        return res.status(200).json({
            message: "Product updated quantity invoice", 
            cart: updatedInvoice
        })
    } catch (error) {
        return res.status(500).send({ 
            message: "Internal server error", 
            error: error 
        })
    }
}

export const getInvoices = async (req, res) => {
    try {
        const { _id } = req.usuario;

        // Populate the `productId` field in the `items` array
        const invoices = await Invoice.find({ userId: _id })
            .populate('items.productId'); // Populating the 'productId' inside 'items'

        return res.json({
            invoices
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message // Improved error handling by logging the error message
        });
    }
};