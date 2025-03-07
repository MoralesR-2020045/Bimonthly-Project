import Cart from "../cart/cart.model.js";
import Product from "../product/product.model.js";
import Invoice from "./invoice.model.js";

export const createInvoice = async (req, res) => {
    try {
        const { _id } = req.usuario

        const cart = await Cart.findOne({ user: _id })
        let totals = 0;
        const invoiceItems = []

        for (let item of cart.items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).send({ 
                    message: `Product not found (ID: ${item.product})` 
                })
            }

            if (product.stock < item.quantity) {
                return res.status(400).send({ 
                    message: `Insufficient stock for ${product.name}` 
                })
            }

            totals += item.quantity * product.price
            product.stock -= item.quantity
            product.bestSelling += item.quantity
            await product.save()


            invoiceItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const invoicess = await Invoice.create({
            userId: _id,
            items: invoiceItems,
            totalPrice: totals
        })


        cart.items = []
        await cart.save()

        return res.status(200).json({
            success: true,
            message: "Invoice successfully ",
            invoice: invoicess
        });

    } catch (error) {
        console.error("Error in createInvoice:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error 
        })
    }
};

export const editInvoice = async (req, res) => {
    try {
        const { invoiceId, productId, quantity } = req.body

        const invoice = await Invoice.findById(invoiceId)

        if (!invoice) {
            return res.status(404).json({ 
                message: "Not found" 
            })
        }

        for(let item of invoice.items) {
            const product = await Product.findById(item.productId)
            if(product){
                product.stock += item.quantity
                await product.save()
            }
        }
        


    } catch (error) {
        console.error("Error in editInvoice", error)
        return res.status(500).send({ message: "Internal server error", error })
    }
}