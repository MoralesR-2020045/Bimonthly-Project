
import { Router } from "express";
import { validatorCreateCategory, validatorDeleteCategory, validatorExisting, validatorUpdateCategory } from "../middleware/category-validator.js";
import { addCategory, deleteCourse, existingCategory, updateUser } from "./category.controller.js";

const router = Router();

router.post("/createCategory", validatorCreateCategory, addCategory) 

router.get("/listCategory", validatorExisting, existingCategory) 

router.put("/updateCategory/:uid", validatorUpdateCategory, updateUser)

router.delete("/deleteCategory/:uid", validatorDeleteCategory, deleteCourse)
export default router;