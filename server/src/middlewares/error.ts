import { NextFunction, Request, Response } from 'express';

class ErrorHandler extends Error {
	statusCode: number;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

type TError = { message: string; statusCode: number };

export const errorMiddleware = (
	err: TError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	err.message = err.message || 'Internal Server Error';

	err.statusCode = err.statusCode || 500;

	return res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

export default ErrorHandler;
