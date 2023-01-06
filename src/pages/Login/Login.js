import {
	Button,
	InputAdornment,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';

export const Login = () => {
	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const [password, setPassword] = useState(false);
	const navigate = useNavigate();

	const schema = Yup.object({
		email: Yup.string().email('Invalid format').required('Required'),
		password: Yup.string()
			.min(3, 'Password must be at least 3')
			.max(8, 'Password must be at least 8')
			.required('Required'),
	});

	const {
		register,
		handleSubmit,
		watch,
		formState,
		formState: { errors, isValid },
	} = useForm({
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		axios
			.post('http://localhost:8080/login', data)
			.then((data) => {
				if (data.status === 200) {
					setToken(data.data.accessToken);
					setUser(data.data.user);
					navigate('/');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Paper
			sx={{
				width: '50%',
				marginX: 'auto',
				marginTop: '15px',
				padding: '32px',
			}}
		>
			<Typography
				variant="h4"
				component="h2"
				textAlign="center"
				gutterBottom
			>
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<TextField
						type="email"
						label="Email"
						helperText={errors.email?.message}
						{...register('email')}
					/>
					<TextField
						type={password ? 'text' : 'password'}
						label="Password"
						helperText={errors.password?.message}
						InputProps={{
							endAdornment: (
								<InputAdornment
									onClick={() => setPassword(!password)}
									position="end"
								>
									<VisibilityIcon cursor="pointer" />
								</InputAdornment>
							),
						}}
						{...register('password')}
					/>
				</Stack>
				<div className="d-flex align-items-center mt-3">
					<Button
						disabled={!isValid}
						type="submit"
						variant="contained"
					>
						Submit
					</Button>
					<NavLink
						className="text-decoration-none ms-3"
						to={'/register'}
					>
						Are you not account yet?
					</NavLink>
				</div>
			</form>
		</Paper>
	);
};
