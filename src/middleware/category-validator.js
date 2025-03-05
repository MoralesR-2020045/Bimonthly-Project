import { body, param } from "express-validator";
import {bodyValidator} from "./document-validator.js"
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExist, categoryNameExist } from "../helpers/db-validator.js";

export const validatorCreateCategory =[
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Name is required"),
    body("name").custom(categoryNameExist),
    body("description").notEmpty().withMessage("Description is required"),
    bodyValidator
]

export const validatorExisting = [
    validateJWT,
    hasRoles("ADMIN"),
]

export const validatorUpdateCategory = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(categoryExist),
    body("name").custom(categoryNameExist),
    bodyValidator
]

export const validatorDeleteCategory = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(categoryExist),
    bodyValidator
]