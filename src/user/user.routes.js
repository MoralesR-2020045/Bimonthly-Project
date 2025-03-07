import { Router } from "express";
import { accountDeletion, deleteUser, modifyRole, updatePersonal, updateUser } from "./user.controller.js";
import { validatorRol, validatorUpdateUser, validatorDeleteUser, updateValidatorPersonal, validatorAccountDeletion } from "../middleware/user-validator.js";

const router = Router()

router.patch("/changeRol/:uid", validatorRol, modifyRole)

router.put("/updateUser/:uid", validatorUpdateUser, updateUser)

router.delete("/deleteUser/:uid", validatorDeleteUser, deleteUser)

router.put('/profileManagement', updateValidatorPersonal, updatePersonal)

router.post('/accountDeletion', validatorAccountDeletion, accountDeletion)

export default router