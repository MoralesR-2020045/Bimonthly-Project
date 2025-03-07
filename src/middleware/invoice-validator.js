import {body, param} from 'express-validator';
import { bodyValidator } from './document-validator.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles, validateUser } from './validate-roles.js';
import { invoiceId, productExist } from '../helpers/db-validator.js';

export const validatorInvoice = [
    validateJWT,
    hasRoles("CLIENT")
]

export const validatorInvoiceUpdate = [
    validateJWT,
    hasRoles("CLIENT"),
    body("invoiceId").isMongoId().custom(invoiceId).withMessage("Not found ID"),
    body("productId").isMongoId().custom(productExist).withMessage("Not found ID"),
    body("newquantity").isInt().withMessage("It must be a whole amount"),
    bodyValidator
]
