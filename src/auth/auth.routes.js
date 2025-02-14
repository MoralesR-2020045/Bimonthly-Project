import { Router } from "express";
import { register, login} from "./auth.controller.js";
import { validatorRegister, validatorLogin } from "../middleware/user-validator.js";
import { uploadProfilePicture } from "../middleware/multer-uploads.js";

const router = Router();

router.post("/register", uploadProfilePicture.single("profilePicture"), validatorRegister, register);

router.post("/login", validatorLogin, login);

export default router;