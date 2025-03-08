import { Router } from "express";
import { addProduct, productCatalog, searchProduct, updateProduct, deleteProduct, getBestSellers, searchProducts, filterProductsByCategory } from "./product.controller.js";
import { validatorAddProduct, validatorDeleteProduct, validatorProduct, validatorUpdateInfoProduct, validatorUpdateProduct } from "../middleware/product-validator.js";

const router = Router();

/**
 * @swagger
 * /bimonthlyProject/v1/product/addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
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
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product added successfully
 *       500:
 *         description: Error adding product
 */
router.post("/addProduct", validatorAddProduct, addProduct);

/**
 * @swagger
 * /bimonthlyProject/v1/product/productCatalog:
 *   get:
 *     summary: Get product catalog
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product catalog retrieved successfully
 *       500:
 *         description: Error retrieving product catalog
 */
router.get("/productCatalog", validatorProduct, productCatalog);

/**
 * @swagger
 * /bimonthlyProject/v1/product/searchProduct/{name}:
 *   get:
 *     summary: Search for a product by name
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Product name
 *     responses:
 *       200:
 *         description: Product found successfully
 *       500:
 *         description: Error searching for product
 */
router.get("/searchProduct/:name", validatorProduct, searchProduct);

/**
 * @swagger
 * /bimonthlyProject/v1/product/updateInformationProduct/{uid}:
 *   put:
 *     summary: Update product information
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
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
 *         description: Product information updated successfully
 *       500:
 *         description: Error updating product information
 */
router.put("/updateInformationProduct/:uid", validatorUpdateInfoProduct, updateProduct);

/**
 * @swagger
 * /bimonthlyProject/v1/product/updateSpecificDetailsProduct/{uid}:
 *   put:
 *     summary: Update specific details of a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product details updated successfully
 *       500:
 *         description: Error updating product details
 */
router.put("/updateSpecificDetailsProduct/:uid", validatorUpdateProduct, updateProduct);

/**
 * @swagger
 * /bimonthlyProject/v1/product/deleteProduct/{uid}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       500:
 *         description: Error deleting product
 */
router.delete("/deleteProduct/:uid", validatorDeleteProduct, deleteProduct);

/**
 * @swagger
 * /bimonthlyProject/v1/product/getBestSellers:
 *   get:
 *     summary: Get best-selling products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Best-selling products retrieved successfully
 *       500:
 *         description: Error retrieving best-selling products
 */
router.get('/getBestSellers', validatorProduct, getBestSellers);

/**
 * @swagger
 * /bimonthlyProject/v1/product/searchProducts:
 *   post:
 *     summary: Search for products
 *     tags: [Product]
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
 *     responses:
 *       200:
 *         description: Products found successfully
 *       500:
 *         description: Error searching for products
 */
router.post('/searchProducts', validatorProduct, searchProducts);

/**
 * @swagger
 * /bimonthlyProject/v1/product/filterProductsCategory/{id}:
 *   get:
 *     summary: Filter products by category
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Products filtered by category successfully
 *       500:
 *         description: Error filtering products by category
 */
router.get('/filterProductsCategory/:id', validatorProduct, filterProductsByCategory);

export default router;