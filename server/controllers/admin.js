import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import { isEmpty, httpCode } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';

export const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (isEmpty(id))
			return next(new ErrorHandler('User Not Present!', httpCode.badRequest));

		const user = await User.findById(id);

		if (!user)
			return next(
				new ErrorHandler('User not found!', httpCode.resourceNotFound)
			);

		if (user.role === 'admin')
			return next(new ErrorHandler('Not Authorized!', httpCode.notAuthorized));

		await Task.deleteMany({ user: user._id });

		await user.deleteOne();

		res.status(httpCode.successful).json({
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

		if (isEmpty(id))
			return new ErrorHandler('No User Id Found!', httpCode.badRequest);

		const user = await User.findById(id);

		if (!user)
			return new ErrorHandler('No User Found!', httpCode.resourceNotFound);

		const tasks = await Task.find({ user: user._id });

		if (!tasks)
			return new ErrorHandler(
				'No Tasks Found for the User!',
				httpCode.resourceNotFound
			);

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

		if (isEmpty(id))
			return new ErrorHandler('No User Id Found!', httpCode.badRequest);

		const tasks = await Task.find({ user: id });

		if (!tasks)
			return new ErrorHandler(
				'No Tasks Found for the User!',
				httpCode.resourceNotFound
			);

		return res.status(httpCode.successful).json({
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

		if (!users)
			return new ErrorHandler('Users not found!', httpCode.resourceNotFound);

		return res.status(httpCode.successful).json({
			success: true,
			message: 'All Users Fetched',
			users,
		});
	} catch (error) {
		next(error);
	}
};
