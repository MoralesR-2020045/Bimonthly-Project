import { Router } from "express";
import { addProductToCart, deleteProductFromCart, getCart, reduceQuantityProducts } from "./cart.controller.js";
import { validatorAddProduct, validatorDeleteProduct, validatorGetProduct, validatorUpdateProduct } from "../middleware/cart-validator.js";
import { createInvoice, editInvoice, getInvoices } from "../invoice/invoice.controller.js";
import { validatorInvoice, validatorInvoiceUpdate } from "../middleware/invoice-validator.js";

const router = Router();

/**
 * @swagger
 * /bimonthlyProject/v1/cart/addCart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       500:
 *         description: Error adding product to cart
 */
router.post("/addCart", validatorAddProduct, addProductToCart);

/**
 * @swagger
 * /bimonthlyProject/v1/cart/cart:
 *   get:
 *     summary: Get cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       500:
 *         description: Error retrieving cart
 */
router.get("/cart", validatorGetProduct, getCart);

/**
 * @swagger
 * /bimonthlyProject/v1/cart/deleteProductFromCart/{productId}:
 *   delete:
 *     summary: Delete product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted from cart successfully
 *       500:
 *         description: Error deleting product from cart
 */
router.delete("/deleteProductFromCart/:productId", validatorDeleteProduct, deleteProductFromCart);

/**
 * @swagger
 * /bimonthlyProject/v1/cart/reduceQuantityProducts/{productId}:
 *   put:
 *     summary: Reduce quantity of products in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quantity reduced successfully
 *       500:
 *         description: Error reducing quantity
 */
router.put("/reduceQuantityProducts/:productId", validatorUpdateProduct, reduceQuantityProducts);

/**
 * @swagger
 * /bimonthlyProject/v1/cart/increaseQuantityProducts/{productId}:
 *   put:
 *     summary: Increase quantity of products in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
*     requestBody:
 *         application/json:
 *           schema:
 *             type: object:
 *             properties:
 *               quantity:t
 *                 type: number
 *     responses:quantity:
 *       200:      type: number
 *         description: Quantity increased successfully
 *       500:
 *         description: Error increasing quantitysfully
:*
router.put("/increaseQuantityProducts/:productId", validatorUpdateProduct, increaseQuantityProducts);
/**uantityProducts/:productId", validatorUpdateProduct, increaseQuantityProducts);


 * @swagger
 * /bimonthlyProject/v1/invoice/invoiceGeneration:
 *   get:
 *     summary: Generate a new invoice
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Invoice generated successfully
 *       500:
 *         description: Error generating invoice
 */
router.get("/invoiceGeneration", validatorInvoice, createInvoice);

/**
 * @swagger
 * /bimonthlyProject/v1/invoice/invoiceUpdate:
 *   patch:
 *     summary: Update an existing invoice
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceId:
 *                 type: string
 *               updateData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       500:
 *         description: Error updating invoice
 */
router.patch("/invoiceUpdate", validatorInvoiceUpdate, editInvoice);

/**
 * @swagger
 * /bimonthlyProject/v1/invoice/invoicesFromUsuario:
 *   get:
 *     summary: Get invoices from a user
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
 *       500:
 *         description: Error retrieving invoices
 */
router.get("/invoicesFromUsuario", validatorInvoice, getInvoices);

export default router;