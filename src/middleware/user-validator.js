import { body, param } from "express-validator";
import { emailExists } from "../helpers/db-validator.js";
import {bodyValidator} from "./document-validator.js"

export const validatorRegister = [
    body("name").notEmpty().withMessage("Name is required"),
    body("surname").notEmpty().withMessage("Surname is required"),
    body("username").notEmpty().withMessage("User name is required"),
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