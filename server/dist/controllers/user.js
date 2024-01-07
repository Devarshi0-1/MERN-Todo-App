var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { sendCookie } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User.findOne({ username }).select('+password');
        if (!user)
            return next(new ErrorHandler('Invalid Username or Password', 400));
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch)
            return next(new ErrorHandler('Invalid Username or Password', 400));
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    }
    catch (error) {
        next(error);
    }
});
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, password } = req.body;
        let user = yield User.findOne({ username });
        if (user)
            return next(new ErrorHandler('User Already Exist', 400));
        const hashedPassword = yield bcrypt.hash(password, 10);
        user = yield User.create({ name, username, password: hashedPassword });
        sendCookie(user, res, 'Registered Successfully', 201);
    }
    catch (error) {
        next(error);
    }
});
export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};
export const logout = (req, res) => {
    res
        .status(200)
        .cookie('token', '', {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'Development' ? false : true,
    })
        .json({
        success: true,
        user: req.user,
    });
};
