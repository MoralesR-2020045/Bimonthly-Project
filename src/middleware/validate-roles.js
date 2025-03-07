export const hasRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                success: false,
                message: "Se quiere verificar un role antes de validar el token"
            })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                success: false,
                message: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}

export const validateUser = (status) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                success: false,
                message: "Verifying a status is required before validating the token"
            })
        }

        if (!status == req.usuario.status) {
            return res.status(401).json({
                success: false,
                message: `The user must have the status: ${status}`
            })
        }
        next()
    }
}

