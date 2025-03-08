import { Router } from "express";
import { accountDeletion, deleteUser, modifyRole, updatePersonal, updateUser } from "./user.controller.js";
import { validatorRol, validatorUpdateUser, validatorDeleteUser, updateValidatorPersonal, validatorAccountDeletion } from "../middleware/user-validator.js";

const router = Router();

/**
 * @swagger
 * /bimonthlyProject/v1/user/changeRol/{uid}:
 *   patch:
 *     summary: Change user role
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User role changed successfully
 *       500:
 *         description: Error changing role
 */
router.patch("/changeRol/:uid", validatorRol, modifyRole);

/**
 * @swagger
 * /bimonthlyProject/v1/user/updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 */
router.put("/updateUser/:uid", validatorUpdateUser, updateUser);

/**
 * @swagger
 * /bimonthlyProject/v1/user/deleteUser/{uid}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Error deleting user
 */
router.delete("/deleteUser/:uid", validatorDeleteUser, deleteUser);

/**
 * @swagger
 * /bimonthlyProject/v1/user/profileManagement:
 *   put:
 *     summary: Update personal profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       500:
 *         description: Error updating profile
 */
router.put('/profileManagement', updateValidatorPersonal, updatePersonal);

/**
 * @swagger
 * /bimonthlyProject/v1/user/accountDeletion:
 *   post:
 *     summary: Delete user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userLoggin:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       500:
 *         description: Error deleting account
 */
router.post('/accountDeletion', validatorAccountDeletion, accountDeletion);

export default router;