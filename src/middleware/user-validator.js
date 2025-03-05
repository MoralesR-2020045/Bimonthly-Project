import { body, param } from "express-validator";
import { emailExists, userNameExists, userExist } from "../helpers/db-validator.js";
import {bodyValidator} from "./document-validator.js"
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const validatorRegister = [
    body("name").notEmpty().withMessage("Name is required"),
    body("surname").notEmpty().withMessage("Surname is required"),
    body("username").notEmpty().withMessage("User name is required"),
    body("username").custom(userNameExists),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("It is not a valid email"),
    body("email").custom(emailExists),
    body("password").notEmpty().withMessage("El password es obligatorio"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUppercase: 1, 
        minNumbers:1,
        minSymbols:1
    }).withMessage("The password must contain at least 8 characters"),
    bodyValidator
]

export const validatorLogin =[
    body("user").optional().notEmpty().withMessage("Email is mandatory"),
    body("password").notEmpty().withMessage("The password is mandatory"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUppercase: 1, 
        minNumbers:1,
        minSymbols:1
    }).withMessage("The password must contain at least 8 characters"),
    bodyValidator
]

export const validatorAdminRegister = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Name is required"),
    body("surname").notEmpty().withMessage("Surname is required"),
    body("username").notEmpty().withMessage("User name is required"),
    body("username").custom(userNameExists),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("It is not a valid email"),
    body("email").custom(emailExists),
    body("password").notEmpty().withMessage("El password es obligatorio"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUppercase: 1, 
        minNumbers:1,
        minSymbols:1
    }).withMessage("The password must contain at least 8 characters"),
    bodyValidator
]

export const validatorRol = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExist),
    bodyValidator
]

export const validatorUpdateUser = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExist),
    body("username").custom(userNameExists),
    bodyValidator
]

export const validatorDeleteUser = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExist),
    bodyValidator
]