import { body, param } from "express-validator";
import { bodyValidator } from "./document-validator.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles, validateUser } from "./validate-roles.js";
import { categoryNameExist, productExist, productName } from "../helpers/db-validator.js";

export const validatorAddProduct = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().custom(productName).withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").notEmpty().isNumeric().withMessage("Price must be a positive number"),
    body("category").isMongoId().custom(categoryNameExist).withMessage("Not a valid ID"),
    body("stock").notEmpty().isNumeric().withMessage("Stock must be a positive integer"),
    bodyValidator
]

export const validatorUpdateProduct = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").optional().isMongoId().custom(productExist).withMessage("Not a valid ID"),
    body("price").optional().isNumeric().withMessage("Price must be a positive number"),
    body("category").optional().isMongoId().custom(categoryNameExist).withMessage("No es un ID válido de categoría"),
    body("stock").optional().isNumeric().withMessage("Stock must be a positive integer"),
    bodyValidator
]


export const validatorUpdateInfoProduct = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").optional().isMongoId().custom(productExist).withMessage("Not a valid ID"),
    body("name").optional().custom(productName).withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description is required"),
    bodyValidator
]



export const validatorDeleteProduct = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().custom(productExist).withMessage("Not a valid ID"),
    bodyValidator
]

export const validatorProduct = [
    validateJWT,
    validateUser(true)
]