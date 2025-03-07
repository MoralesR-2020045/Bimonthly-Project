import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptPassword = await hash(data.password)
        data.password = encryptPassword
        data.profilePicture = profilePicture

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

export const login = async (req, res) => {
    try {
        const { user, password } = req.body;
        const acces = await User.findOne({ $or: [{ email: user }, { username: user }] });

        if (!acces) {
            return res.status(400).json({
                message: "Invalid credential",
                error: "There is no user with the entered email"
            })
        }

        const validatorPassword = await verify(acces.password, password)

        if (!validatorPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "The password is incorrect"
            })
        }

        const webToken = await generateJWT(acces.id)
        return res.status(200).json({
            message: "login successful",
            userDetails: {
                role: `Te has logeado desde tu cuenta de ${acces.role}`,
                token: webToken
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message

        })
    }
}