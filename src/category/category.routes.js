
import { Router } from "express";
import { validatorCreateCategory } from "../middleware/category-validator.js";
import { addCategory } from "./category.controller.js";

const router = Router();

router.post("/createCategory", validatorCreateCategory, addCategory) 


export default router;