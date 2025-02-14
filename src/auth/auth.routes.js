import { Router } from "express";
import { register, login} from "./auth.controller.js";
import { validatorRegister, validatorLogin, validatorAdminRegister} from "../middleware/user-validator.js";
import { uploadProfilePicture } from "../middleware/multer-uploads.js";

const router = Router()

router.post("/register", uploadProfilePicture.single("profilePicture"), validatorRegister, register);

router.post("/login", validatorLogin, login)

router.post("/registerClient", uploadProfilePicture.single("profilePicture"), validatorAdminRegister, register)

export default router