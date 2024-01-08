import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { sendCookie, httpCode } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username }).select('+password');

		if (!user)
			return next(
				new ErrorHandler('Invalid Username or Password', httpCode.badRequest)
			);

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			return next(
				new ErrorHandler('Invalid Username or Password', httpCode.badRequest)
			);

		sendCookie(user, res, `Welcome back, ${user.name}`, httpCode.successful);
	} catch (error) {
		next(error);
	}
};

export const register = async (req, res, next) => {
	try {
		const { name, username, password } = req.body;

		let user = await User.findOne({ username });

		if (user)
			return next(new ErrorHandler('User Already Exist', httpCode.badRequest));

		const hashedPassword = await bcrypt.hash(password, 10);

		user = await User.create({ name, username, password: hashedPassword });

		sendCookie(user, res, 'Registered Successfully', httpCode.resourceCreated);
	} catch (error) {
		next(error);
	}
};

export const getMyProfile = (req, res) => {
	res.status(httpCode.successful).json({
		success: true,
		message: 'User Profile Fetched',
		user: req.user,
	});
};

export const logout = (req, res) => {
	res
		.status(httpCode.successful)
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
