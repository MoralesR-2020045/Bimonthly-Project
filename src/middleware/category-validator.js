import { body, param } from "express-validator";
import {bodyValidator} from "./document-validator.js"
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const validatorCreateCategory =[
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    bodyValidator
]