import { Schema, Model, model, Document } from 'mongoose';

interface IUser {
	name: string;
	username: string;
	password: string;
	role: 'visitor' | 'admin';
	createdAt: Date;
}

const schema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		select: false,
		required: true,
	},
	role: {
		type: String,
		default: 'visitor',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export interface IUserModel extends IUser, Document {}

export const User = model<IUserModel>('User', schema);
