import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {
	const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
		useContext(Context);

    const handleLogout = async () => {
        setLoading(true)
		try {
            await axios.get(`${server}/users/logout`, {
                withCredentials: true,
			});
            
			toast.success('Logged Out Successfully');
			setIsAuthenticated(false);
            setLoading(false)
		} catch (error) {
            toast.error(error.response.data.message);
			setIsAuthenticated(true);
			console.log(error);
            setLoading(false)
		}
	};

	return (
		<nav className='header'>
			<div>
				<h2>Todo App.</h2>
			</div>
			<article>
				<Link to='/'>Home</Link>
				<Link to='/profile'>Profile</Link>
				{isAuthenticated ? (
					<button
						className='btn'
                        onClick={handleLogout}
                        disabled={loading}
                    >
						Logout
					</button>
				) : (
					<Link to='/login'>Login</Link>
				)}
			</article>
		</nav>
	);
};
export default Header;
