import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createContext } from 'react';
import './styles/app.scss';
import { useState } from 'react';

export const Context = createContext({ isAuthenticated: false });

export const server =
	import.meta.env.VITE_ENV_MODE === 'Development'
		? 'http://localhost:5000'
		: 'https://mern-todo-backend-vercel.vercel.app/api/v1';

const AppWrapper = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});

	return (
		<Context.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				loading,
				setLoading,
				user,
				setUser,
			}}>
			<App />
		</Context.Provider>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppWrapper />
	</React.StrictMode>
);
