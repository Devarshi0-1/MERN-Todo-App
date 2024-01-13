import { AxiosError } from 'axios';

export {};

interface IAxiosErrorMessage {
	message: string;
}

interface IAxiosErrorData {
	data: IAxiosErrorMessage;
}

declare global {
	type TUser = {
		name: string;
		_id: string;
		username: string;
		password?: string;
		role: 'visitor' | 'admin' | 'testAdmin';
		createdAt: Date;
	} | null;

	type TTask = {
		user: TUser;
		_id: string;
		title: string;
		description: string;
		isCompleted: boolean;
		createdAt: Date;
	};

	type TBasicRes = {
		error: boolean;
		message: string;
	};

	interface IAxiosErrorResponse extends AxiosError {
		response: IAxiosErrorData;
	}

	type TTaskData = TBasicRes & { tasks: TTask[] };

	type TUserData = TBasicRes & { users: TUser[] };

	type TFetchGetTasks = {
		error: TBasicRes;
		loading?: boolean;
		data: TTaskData;
	};
	type TFetchGetUsers = {
		error: TBasicRes;
		loading?: boolean;
		data: TUserData;
	};
	type TFetchGetUser = { error: TBasicRes; loading?: boolean; user: TUser };
}
