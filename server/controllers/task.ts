import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../middlewares/error';
import { Task } from '../models/task';

export const newTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { title, description } = req.body;

		await Task.create({
			title,
			description,
			user: req.user,
		});

		res.status(201).json({
			success: true,
			message: 'Task added Successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const getMyTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user._id;

		const tasks = await Task.find({ user: userId });

		res.status(200).json({
			success: true,
			tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) return next(new ErrorHandler('Task not found', 404));

		task.isCompleted = !task.isCompleted;
		await task.save();

		res.status(200).json({
			success: true,
			message: 'Task Updated!',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) return next(new ErrorHandler('Task not found', 404));
		await task.deleteOne();

		res.status(200).json({
			message: 'Task Deleted!',
			success: true,
		});
	} catch (error) {
		next(error);
	}
};
