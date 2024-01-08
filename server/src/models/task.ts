import { Schema, model, Document } from 'mongoose';

interface ITask {
	user: Schema.Types.ObjectId;
	title: string;
	description: string;
	isCompleted: boolean;
	createdAt: Date;
}

const schema = new Schema<ITask>({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export interface ITaskModel extends ITask, Document {}

export const Task = model<ITaskModel>('Task', schema);
