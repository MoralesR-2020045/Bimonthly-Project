import { Router } from "express";
import { validatorCreateCategory, validatorDeleteCategory, validatorExisting, validatorUpdateCategory } from "../middleware/category-validator.js";
import { addCategory, deleteCourse, existingCategory, updateUser } from "./category.controller.js";
import { validatorProduct } from "../middleware/product-validator.js";

const router = Router();

/**
 * @swagger
 * /bimonthlyProject/v1/category/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Error creating category
 */
router.post("/createCategory", validatorCreateCategory, addCategory);

/**
 * @swagger
 * /bimonthlyProject/v1/category/listCategory:
 *   get:
 *     summary: List all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories listed successfully
 *       500:
 *         description: Error listing categories
 */
router.get("/listCategory", validatorProduct, existingCategory);

/**
 * @swagger
 * /bimonthlyProject/v1/category/updateCategory/{uid}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       500:
 *         description: Error updating category
 */
router.put("/updateCategory/:uid", validatorUpdateCategory, updateUser);

/**
 * @swagger
 * /bimonthlyProject/v1/category/deleteCategory/{uid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:uid", validatorDeleteCategory, deleteCourse);

export default router;