import mongoose from 'mongoose';

export const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			dbName: 'backendapi',
		})
		.then((c) => console.log(`Database Connected With ${c.connection.host}`))
		.catch(() => console.log('There was an error connecting to the Database'));
};
