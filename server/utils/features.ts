import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { IUserModel } from '../models/user.js';

export const sendCookie = (
	user: IUserModel,
	res: Response,
	message: string,
	statusCode: number = 200
) => {
	const maxAge = 15 * 24 * 60 * 60 * 1000;

	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
	res
		.status(statusCode)
		.cookie('token', token, {
			httpOnly: true,
			maxAge,
			sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
			secure: process.env.NODE_ENV === 'Development' ? false : true,
			// @ts-ignore
			origin: process.env.FRONTEND_URL!,
		})
		.json({
			success: true,
			message,
		});
};

export const isEmpty = (...strings: string[]) => {
	strings.forEach((str) => {
		if (
			str === null ||
			str === undefined ||
			str.length <= 0 ||
			isHavingOnlyWhiteSpaces(str)
		)
			return true;
	});
	return false;
};

const isHavingOnlyWhiteSpaces = (elem: string) => {
	if (elem.replace(/\s/g, '').length) return false;
	return true;
};
