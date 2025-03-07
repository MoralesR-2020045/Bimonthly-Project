import { Router } from "express";
import { createInvoice } from "./invoice.controller.js";
import { validatorInvoice } from "../middleware/invoice-validator.js";

const router = Router()

router.get("/invoiceGeneration", validatorInvoice, createInvoice)

export default router