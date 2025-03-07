import { Router } from "express";
import { createInvoice, editInvoice, getInvoices } from "./invoice.controller.js";
import { validatorInvoice, validatorInvoiceUpdate } from "../middleware/invoice-validator.js";

const router = Router()

router.get("/invoiceGeneration", validatorInvoice, createInvoice)

router.patch("/invoiceUpdate", validatorInvoiceUpdate, editInvoice)

router.get("/invoicesFromUsuario", validatorInvoice, getInvoices)
export default router