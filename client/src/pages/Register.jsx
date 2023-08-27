import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
		useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(
				`${server}/users/new`,
				{
					name,
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);

			toast.success(data.message);
			setIsAuthenticated(true);
			setLoading(false);
		} catch (error) {
            toast.error(error.response.data.message);
			setIsAuthenticated(false);
            setLoading(false);
		}
	};

	if (isAuthenticated) return <Navigate to='/' />;

	return (
		<div className='login'>
			<section>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Name'
						autoComplete='on'
						required
					/>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						autoComplete='on'
						required
					/>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						autoComplete='on'
						required
					/>
					<button type='submit' disabled={loading}>Sign Up</button>
					<h4>Or</h4>
					<Link to='/login'>Login Up</Link>
				</form>
			</section>
		</div>
	);
};
export default Register;
