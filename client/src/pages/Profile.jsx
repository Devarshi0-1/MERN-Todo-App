import { useContext } from 'react';
import { Context } from '../main';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';

const Profile = () => {
	const { isAuthenticated, loading, user } = useContext(Context);

	if (!isAuthenticated) return <Navigate to={'/login'} />;

	return loading ? (
		<Loader />
	) : (
		<div>
			<h1>{user?.name}</h1>
			<p>{user?.username}</p>
		</div>
	);
};
export default Profile;
