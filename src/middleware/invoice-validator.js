import {body, param} from 'express-validator';
import { bodyValidator } from './document-validator.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles, validateUser } from './validate-roles.js';
import { productExist } from '../helpers/db-validator.js';

export const validatorInvoice = [
    validateJWT,
    hasRoles("CLIENT")
]
