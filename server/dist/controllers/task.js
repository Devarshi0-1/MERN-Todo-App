var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ErrorHandler from '../middlewares/error.js';
import { Task } from '../models/task.js';
export const newTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        yield Task.create({
            title,
            description,
            user: req.user,
        });
        res.status(201).json({
            success: true,
            message: 'Task added Successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
export const getMyTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const tasks = yield Task.find({ user: userId });
        res.status(200).json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        next(error);
    }
});
export const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task.findById(req.params.id);
        if (!task)
            return next(new ErrorHandler('Task not found', 404));
        task.isCompleted = !task.isCompleted;
        yield task.save();
        res.status(200).json({
            success: true,
            message: 'Task Updated!',
        });
    }
    catch (error) {
        next(error);
    }
});
export const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task.findById(req.params.id);
        if (!task)
            return next(new ErrorHandler('Task not found', 404));
        yield task.deleteOne();
        res.status(200).json({
            message: 'Task Deleted!',
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
