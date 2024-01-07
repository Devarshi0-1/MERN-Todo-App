var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import { isEmpty } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';
export const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (isEmpty(id))
            return next(new ErrorHandler('User Not Present', 400));
        const user = yield User.findById(id);
        if (!user)
            return next(new ErrorHandler('User not found', 404));
        if (user.role === 'admin')
            return next(new ErrorHandler('Not Authorized', 401));
        yield Task.deleteMany({ user: user._id });
        yield user.deleteOne();
        res.status(200).json({
            success: true,
            message: 'User Deleted!',
        });
    }
    catch (error) {
        next(error);
    }
});
export const getUserTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (isEmpty(id))
            return new ErrorHandler('No User Id Found!', 401);
        const user = yield User.findById(id);
        if (!user)
            return new ErrorHandler('No User Found!', 404);
        const tasks = yield Task.find({ user: user._id });
        if (!tasks)
            return new ErrorHandler('No Tasks Found for the User!', 404);
        res.json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        next(error);
    }
});
export const getAllTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (isEmpty(id))
            return new ErrorHandler('No User Id Found!', 401);
        const tasks = yield Task.find({ user: id });
        if (!tasks)
            return new ErrorHandler('No Tasks Found for the User!', 404);
        return res.status(200).json({
            success: true,
            message: 'All Tasks Fetched',
            tasks,
        });
    }
    catch (error) {
        next(error);
    }
});
export const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find({});
        if (!users)
            return new ErrorHandler('Users not found!', 500);
        return res.status(200).json({
            success: true,
            message: 'All Users Fetched',
            users,
        });
    }
    catch (error) {
        next(error);
    }
});
