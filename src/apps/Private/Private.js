import { Login } from '../../pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { Admin } from '../../pages/Admin/Admin';
import { Client } from '../../pages/Client/Client';
import { Register } from '../../pages/Register/Register';

export const Private = () => {
	return (
		<Routes>
			<Route path="/" element={<Client />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/admin/*" element={<Admin />} />
		</Routes>
	);
};
