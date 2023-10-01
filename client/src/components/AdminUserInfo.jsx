import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import AdminTodo from './AdminTodo';
import { server } from '../main';
import UserImg from './../assets/user_profile.png';
import { f } from '../utils/DateTimeFormat.js';

const AdminUserInfo = ({ user, handleUserDelete }) => {
	const [tasks, setTasks] = useState(null);
	const [tasksRefresh, setTasksRefresh] = useState(false);
	const [isExpand, setIsExpand] = useState(false);

	const [listRef] = useAutoAnimate();

	useEffect(() => {
		axios
			.get(`${server}/admin/getAllTasks/${user._id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setTasks(res.data.tasks);
			})
			.catch((err) => {
				setTasks(null);
				console.log(err);
			});

	}, [tasksRefresh]);

	const handleDelete = async (id) => {
		try {
			const { data } = await axios.delete(`${server}/task/${id}`, {
				withCredentials: true,
			});
			toast.success(data.message);
			setTasksRefresh((prevVal) => !prevVal);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const handleTodoUpdate = async (id) => {
		try {
			const { data } = await axios.put(
				`${server}/task/${id}`,
				{},
				{ withCredentials: true }
			);
			toast.success(data.message);
			setTasksRefresh((prevVal) => !prevVal);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<>
			<div className='tableRowWrapper'>
				<div className='user-about'>
					<div className='user-image-wrapper'>
						<img
							src={UserImg}
							alt='User Img'
						/>
					</div>
					<div className='user-details'>
						<p>{user.name}</p>
						<p>{user.username}</p>
					</div>
				</div>
				<div className='noOfTasks'>
					<p>{tasks?.length}</p>
				</div>
				<div className={'role'}>
					<p className={`${user.role === 'visitor' ? 'visitor' : 'admin'}`}>
						{user.role}
					</p>
				</div>
				<div className='createdAt'>
					<p>{f.format(new Date(user.createdAt))}</p>
				</div>
				<div className='mutations'>
					<MdDelete
						className={`${user.role === 'admin' ? 'admin' : 'visitor'}`}
						onClick={() => handleUserDelete(user._id)}
					/>
				</div>
				<IoIosArrowDropdownCircle
					className={`expand ${tasks?.length > 0 ? 'show' : 'hide'}`}
					style={isExpand ? { transform: 'rotate(180deg)' } : ''}
					onClick={() => setIsExpand((prevVal) => !prevVal)}
				/>
			</div>
			{tasks?.length > 0 && (
				<div
					className='adminTodoRowWrapper'
					style={isExpand ? {} : { display: 'none' }}
					ref={listRef}>
					<div className='adminTodoWrapper'>
						<p className='adminTodo-header-text'>Task</p>
						<p className='adminTodo-header-text'>Description</p>
						<p className='adminTodo-header-text'>Created On</p>
						<p className='adminTodo-header-text'>Mutations</p>
					</div>
					{tasks?.map((task) => (
						<AdminTodo
							key={task._id}
							id={task._id}
							title={task.title}
							desc={task.description}
							createdAt={task.createdAt}
							isCompleted={task.isCompleted}
							handleDelete={handleDelete}
							handleTodoUpdate={handleTodoUpdate}
						/>
					))}
				</div>
			)}
		</>
	);
};
export default AdminUserInfo;
