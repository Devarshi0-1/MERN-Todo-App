import { IUserModel } from './models/user';

global {
	declare namespace Express {
		interface Request {
			user?: IUserModel;
		}
	}
}
