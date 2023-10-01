import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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

export const User = mongoose.model('User', schema);
