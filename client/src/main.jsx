import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

export const server =
	import.meta.env.VITE_ENV_MODE === 'Development'
		? 'http://localhost:5000/api/v1'
		: 'https://mern-todo-backend-vercel.vercel.app/api/v1';

const AppWrapper = () => {
	return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppWrapper />
	</React.StrictMode>
);
