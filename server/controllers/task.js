import ErrorHandler from '../middlewares/error.js';
import { httpCode } from '../utils/features.js';
import { Task } from '../models/task.js';

export const newTask = async (req, res, next) => {
	try {
		const { title, description } = req.body;

		await Task.create({
			title,
			description,
			user: req.user,
		});

		res.status(httpCode.resourceCreated).json({
			success: true,
			message: 'Task added Successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const getMyTask = async (req, res, next) => {
	try {
		const userId = req.user._id;

		const tasks = await Task.find({ user: userId });

		res.status(httpCode.successful).json({
            success: true,
            message: "User Task Fetched",
			tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task)
			return next(
				new ErrorHandler('Task not found', httpCode.resourceNotFound)
			);

		task.isCompleted = !task.isCompleted;
		await task.save();

		res.status(httpCode.successful).json({
			success: true,
			message: 'Task Updated!',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteTask = async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task)
			return next(
				new ErrorHandler('Task not found', httpCode.resourceNotFound)
			);
		await task.deleteOne();

		res.status(httpCode.successful).json({
			message: 'Task Deleted!',
			success: true,
		});
	} catch (error) {
		next(error);
	}
};
