import {body, param} from 'express-validator';
import { bodyValidator } from './document-validator.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles, validateUser } from './validate-roles.js';
import { productExist } from '../helpers/db-validator.js';

export const validatorAddProduct = [
    validateJWT,
    hasRoles("CLIENT"),
    body("productId").isMongoId().custom(productExist).withMessage("Not a valid ID"),
    body("quantity").notEmpty().withMessage("Quantity must be a positive integer"),
    bodyValidator
]

export const validatorGetProduct = [
    validateJWT,
    validateUser(true),
]


export const validatorDeleteProduct = [
    validateJWT,
    hasRoles("CLIENT"),
    param("productId").isMongoId().custom(productExist).withMessage("Not a valid ID"),
]

export const validatorUpdateProduct = [
    validateJWT,
    hasRoles("CLIENT"),
    param("productId").isMongoId().custom(productExist).withMessage("Not a valid ID"),
    body("quantity").optional().isInt().withMessage("Quantity must be a positive integer"),
]