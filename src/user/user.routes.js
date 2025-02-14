import { Router } from "express";
import { deleteUser, modifyRole, updateUser } from "./user.controller.js";
import { validatorRol, validatorUpdateUser, validatorDeleteUser } from "../middleware/user-validator.js";

const router = Router()

router.patch("/changeRol/:uid", validatorRol, modifyRole)

router.put("/updateUser/:uid", validatorUpdateUser, updateUser)

router.delete("/deleteUser/:uid", validatorDeleteUser, deleteUser)

export default router