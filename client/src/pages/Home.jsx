import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem';

const Home = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const { isAuthenticated } = useContext(Context);

	const handleUpdate = async (id) => {
		// const updateItem = tasks.filter((task) => {
		// 	return task._id === id;
		// })[0];
		// updateItem.isCompleted = !updateItem.isCompleted;
		// setTasks((prev) => [...prev, updateItem]);
		setTasks((prev) => {
			prev.map((task) => {
				task._id === id ? { ...task, isCompleted: !isCompleted } : task;
			});
		});
		try {
			const { data } = await axios.put(
				`${server}/task/${id}`,
				{},
				{ withCredentials: true }
			);
			toast.success(data.message);
			setRefresh((prevVal) => !prevVal);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const handleDelete = async (id) => {
		try {
			const { data } = await axios.delete(`${server}/task/${id}`, {
				withCredentials: true,
			});
			toast.success(data.message);
			setRefresh((prevVal) => !prevVal);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setTasks((prev) => [
			...prev,
			{
				_id: prev.length + 1,
				title,
				description,
				isCompleted: false,
				handleUpdate: () => {},
				handleDelete: () => {},
			},
		]);
		try {
			const { data } = await axios.post(
				`${server}/task/new`,
				{
					title,
					description,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			toast.success(data.message);
			setLoading(false);
			setTitle('');
			setDescription('');
			setRefresh((prevVal) => !prevVal);
		} catch (error) {
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		axios
			.get(`${server}/task/my`, { withCredentials: true })
			.then((res) => {
				setTasks(res.data.tasks);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	}, [refresh]);

	if (!isAuthenticated) return <Navigate to='/login' />;

	return (
		<div className='container'>
			<div className='login'>
				<section>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Title'
							name='title'
							id='title'
							autoComplete='on'
							required
						/>
						<input
							type='text'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder='Description'
							name='description'
							id='description'
							autoComplete='on'
							required
						/>

						<button
							type='submit'
							disabled={loading}>
							Add Task
						</button>
					</form>
				</section>
			</div>
			<section className='todosContainer'>
				{tasks?.map((task) => (
					<TodoItem
						key={task._id}
						id={task._id}
						title={task.title}
						desc={task.description}
						isCompleted={task.isCompleted}
						handleUpdate={handleUpdate}
						handleDelete={handleDelete}
					/>
				))}
			</section>
		</div>
	);
};
export default Home;
