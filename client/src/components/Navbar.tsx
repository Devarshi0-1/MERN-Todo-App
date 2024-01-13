import axios from 'axios';
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { server } from '../main';
import { useStore } from '../utils/store';

const Navbar: FC = () => {
	const {
		user,
		setUser,
		isAuthenticated,
		setIsAuthenticated,
		loading,
		setLoading,
	} = useStore();

	const handleLogout = async () => {
		setLoading(true);
		try {
			await axios.get(`${server}/users/logout`, {
				withCredentials: true,
			});

			toast.success('Logged Out Successfully');
			setIsAuthenticated(false);
			setLoading(false);
			setUser(null);
		} catch (error) {
			const err = error as IAxiosErrorResponse;
			toast.error(err.response.data.message);
			setIsAuthenticated(true);
			setLoading(false);
		}
	};

	return (
		<nav className='flex items-center bg-zinc-900 px-14 py-3 text-gray-200'>
			<div className='mr-auto'>
				<h1 className='text-4xl'>Todo App</h1>
			</div>
			<div>
				<ul className='flex gap-10 text-2xl'>
					{(user?.role === 'admin' || user?.role === 'testAdmin') && (
						<li>
							<button>
								<Link to='/dashboard'>Dashboard</Link>
							</button>
						</li>
					)}
					{isAuthenticated && (
						<li>
							<button>
								<Link to='/'>
									<FiHome />
								</Link>
							</button>
						</li>
					)}
					{isAuthenticated && (
						<li className='flex items-center justify-center'>
							<button
								onClick={handleLogout}
								disabled={loading}>
								<FiLogOut />
							</button>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};
export default Navbar;
