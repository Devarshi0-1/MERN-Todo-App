import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import { isEmpty } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';

export const deleteUser = async (req, res, next) => {
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

export const getUserTasks = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (isEmpty(id)) return new ErrorHandler('No User Id Found!');

		const user = await User.findById(id);

		const tasks = await Task.find({ user: user._id });

		if (!user) return new ErrorHandler('No User Found!');

		if (!tasks) return new ErrorHandler('No Tasks Found for the User!');

		res.json({
			success: true,
			tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllTasks = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (isEmpty(id)) return new ErrorHandler('No User Id Found!');

		const tasks = await Task.find({ user: id });

		if (!tasks) return new ErrorHandler('No Tasks Found for the User!');

		return res.status(200).json({
			success: true,
			message: 'All Tasks Fetched',
			tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});

		return res.status(200).json({
			success: true,
			message: 'All Users Fetched',
			users,
		});
	} catch (error) {
		next(error);
	}
};
