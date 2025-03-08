import { Router } from "express";
import { createInvoice, editInvoice, getInvoices } from "./invoice.controller.js";
import { validatorInvoice, validatorInvoiceUpdate } from "../middleware/invoice-validator.js";

const router = Router();

/**
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