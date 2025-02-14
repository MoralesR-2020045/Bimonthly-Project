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
        const {uid} = req.params;
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
