import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { sendCookie } from '../utils/features';
import ErrorHandler from '../middlewares/error';
import { NextFunction, Request, Response } from 'express';

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username }).select('+password');

		if (!user)
			return next(new ErrorHandler('Invalid Username or Password', 400));

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			return next(new ErrorHandler('Invalid Username or Password', 400));

		sendCookie(user, res, `Welcome back, ${user.name}`, 200);
	} catch (error) {
		next(error);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, username, password } = req.body;

		let user = await User.findOne({ username });

		if (user) return next(new ErrorHandler('User Already Exist', 400));

		const hashedPassword = await bcrypt.hash(password, 10);

		user = await User.create({ name, username, password: hashedPassword });

		sendCookie(user, res, 'Registered Successfully', 201);
	} catch (error) {
		next(error);
	}
};

export const getMyProfile = (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		user: req.user,
	});
};

export const logout = (req: Request, res: Response) => {
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
