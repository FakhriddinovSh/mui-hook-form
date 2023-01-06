import { Public } from '../src/apps/Public/Public';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Private } from './apps/Private/Private';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';
import { Admin } from './pages/Admin/Admin';
import { Client } from './pages/Client/Client';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

export const App = () => {
	// return (
	// 	<Routes>
	// 		<Route path="/" element={<Client />} />
	// 		<Route path="/login" element={<Login />} />
	// 		<Route path="/register" element={<Register />} />
	// 		<Route path="/admin" element={<Admin />} />
	// 	</Routes>
	// );

	const { token } = useContext(AuthContext);
	if (token) {
		return <Private />;
	} else {
		return <Public />;
	}
};
