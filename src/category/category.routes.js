
import { Router } from "express";
import { validatorCreateCategory } from "../middleware/category-validator.js";
import { addCategory, existingCategory } from "./category.controller.js";

const router = Router();

router.post("/createCategory", validatorCreateCategory, addCategory) 

router.get("/", existingCategory) 
export default router;