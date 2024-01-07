import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { Task } from '../models/task';
import { isEmpty } from '../utils/features';
import ErrorHandler from '../middlewares/error';

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (isEmpty(id)) return next(new ErrorHandler('User Not Present', 400));

		const user = await User.findById(id);

		if (!user) return next(new ErrorHandler('User not found', 404));

		if (user.role === 'admin')
			return next(new ErrorHandler('Not Authorized', 401));

		await Task.deleteMany({ user: user._id });

		await user.deleteOne();

		res.status(200).json({
			success: true,
			message: 'User Deleted!',
		});
	} catch (error) {
		next(error);
	}
};

export const getUserTasks = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (isEmpty(id)) return new ErrorHandler('No User Id Found!', 401);

		const user = await User.findById(id);

		if (!user) return new ErrorHandler('No User Found!', 404);

		const tasks = await Task.find({ user: user._id });

		if (!tasks) return new ErrorHandler('No Tasks Found for the User!', 404);

		res.json({
			success: true,
			tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllTasks = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		if (isEmpty(id)) return new ErrorHandler('No User Id Found!', 401);

		const tasks = await Task.find({ user: id });

		if (!tasks) return new ErrorHandler('No Tasks Found for the User!', 404);

		return res.status(200).json({
			success: true,
			message: 'All Tasks Fetched',
			tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await User.find({});

		if (!users) return new ErrorHandler('Users not found!', 500);

		return res.status(200).json({
			success: true,
			message: 'All Users Fetched',
			users,
		});
	} catch (error) {
		next(error);
	}
};
