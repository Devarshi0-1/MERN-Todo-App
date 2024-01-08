import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.js';

export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.cookies;

	if (!token)
		return res.status(404).json({
			success: false,
			message: 'Login First',
		});

	const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

	req.user = await User.findById(decoded._id);

	next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (req.user.role === 'admin') next();
	else
		return res.status(401).json({
			success: false,
			message: 'Access Denied',
		});
};
