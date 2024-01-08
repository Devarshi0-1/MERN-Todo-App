var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
export const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return res.status(404).json({
            success: false,
            message: 'Login First',
        });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = yield User.findById(decoded._id);
    next();
});
export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin')
        next();
    else
        return res.status(401).json({
            success: false,
            message: 'Access Denied',
        });
};
//# sourceMappingURL=auth.js.map