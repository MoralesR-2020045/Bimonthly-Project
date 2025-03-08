import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { validatorRegister, validatorLogin, validatorAdminRegister } from "../middleware/user-validator.js";
import { uploadProfilePicture } from "../middleware/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /bimonthlyProject/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: User registration failed
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), validatorRegister, register);

/**
 * @swagger
 * /bimonthlyProject/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed, server error
 */
router.post("/login", validatorLogin, login);

/**
 * @swagger
 * /bimonthlyProject/v1/auth/registerClient:
 *   post:
 *     summary: Register a new client by admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Client registered successfully
 *       500:
 *         description: Client registration failed
 */
router.post("/registerClient", uploadProfilePicture.single("profilePicture"), validatorAdminRegister, register);

export default router;