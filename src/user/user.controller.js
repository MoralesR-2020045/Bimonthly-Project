import { verify } from "argon2";
import User from "./user.model.js"

export const modifyRole = async (req, res) => {
    try {
        const {uid} = req.params;
        const data = req.body;
        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            msg: 'The client has changed roles',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error changing role',
            error: err.message
        });
    }
}


export const updateUser = async (req, res) => {
    try {
        const {uid} = req.params;
        const data = req.body
        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            msg: 'The client has been edited correctly',
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            role: user.role,
            phone: user.phone
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error editing client',
            error: err.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {uid} = req.params
        await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Deleted user",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error editing client',
            error: err.message
        });
    }
}

export const updatePersonal = async (req, res) => {
    try {
        const {_id} = req.usuario
        const data = req.body
        const update = await User.findByIdAndUpdate(_id, data, { new: true })
        if (!update) return res.status(404).json({
                success: false,
                message: 'Not found'
            })
        return res.json({
                success: true,
                message: 'User updated successfully',
                update
            })
    } catch (e) {
        console.error(e)
        return res.status(500).json({
                success: false,
                message: 'Error updated successfully',
                e
            })
    }
}


export const accountDeletion = async (req, res) => {
    try {
        const  {uid}  = req.usuario
        const { userLoggin, password } = req.body
        
        const user = await User.findOne({
                $or: [{ email: userLoggin },{ username: userLoggin }]
            })

        if (user && await verify(user.password, password)) {
            let id  = user.id
            console.log(id)

            if(id === uid){
                await User.findByIdAndUpdate(id, { status: false }, { new: true })
                return res.send(
                    { 
                        success: true,
                        message: 'Your account has been deleted'
                    }
                )
            }
        }

        return res.status(400).send({ message: 'Wrong email or password' })
        
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            { 
                success: false,
                message: 'Error deleting', 
                e 
            }
        )
    }
};