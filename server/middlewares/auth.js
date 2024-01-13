import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
import { httpCode } from '../utils/features.js'

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies

    if (!token)
        return res.status(httpCode.resourceNotFound).json({
            success: false,
            message: 'Login First',
        })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded._id)

    next()
}

export const checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return res.status(httpCode.notAuthorized).json({
                success: false,
                message: 'Access Denied!',
            })
        next()
    }
}
