import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        const encryptPassword = await hash(data.password)
        data.password = encryptPassword

        const user = await User.create(data);

        return res.status(201).json({
            message: "You have successfully registered",
            name: user.name,
            email: user.email,
            rol: user.role
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}
