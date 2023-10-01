import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AdminUserInfo from '../components/AdminUserInfo';
import Loader from '../components/Loader';
import { server } from '../main';
import { Context } from '../main';

const Dashboard = () => {
	const { isAuthenticated } = useContext(Context);
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState(null);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		axios
			.get(`${server}/admin/getAllUsers`, {
				withCredentials: true,
			})
			.then((res) => {
				setUsers(res.data.users);
				toast.success(res.data.message);
			})
			.catch((err) => {
				setUsers(null);
				toast.error(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [refresh]);

	const handleUserDelete = async (id) => {
		try {
			const { data } = await axios.delete(`${server}/admin/delete/${id}`, {
				withCredentials: true,
			});
			toast.success(data.message);
			setRefresh((prevVal) => !prevVal);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}

	return (
		<div className='dashboard'>
			<h1>Dashboard</h1>
			{loading ? (
				<Loader />
			) : (
				<div className='usersInfoCont'>
					<div className='tableRowWrapper'>
						<p className='usersInfo-header-text'>User</p>
						<p className='usersInfo-header-text'>No. of Tasks</p>
						<p className='usersInfo-header-text'>Role</p>
						<p className='usersInfo-header-text'>Created On</p>
						<p className='usersInfo-header-text'>Mutations</p>
					</div>
					{users?.map((user) => (
						<AdminUserInfo
							key={user._id}
							user={user}
							handleUserDelete={handleUserDelete}
						/>
					))}
				</div>
			)}
		</div>
	);
};
export default Dashboard;
