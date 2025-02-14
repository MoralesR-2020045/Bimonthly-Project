import { validationResult } from "express-validator";

export const bodyValidator = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: "We have found errors when validating",
            errors: errors.array()
        });
    }
    next()
}