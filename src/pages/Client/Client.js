import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Email';
import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	SwipeableDrawer,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserContext } from '../../context/UserContext';
import { MediaCard } from '../../components/Card/Card';

export const Client = () => {
	const [state, setState] = React.useState({
		right: false,
	});
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
			}}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map(
					(text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<InboxIcon />
									) : (
										<MailIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					),
				)}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
	const { user } = React.useContext(UserContext);

	console.log();
	return (
		<>
			<Paper>
				<Container>
					<Box
						style={{
							paddingTop: '15px',
							paddingBottom: '15px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Typography
							variant="h5"
							noWrap
							component="a"
							href=""
							sx={{
								fontWeight: 700,
								textDecoration: 'none',
							}}
						>
							LOGO
						</Typography>
						<Box>
							<IconButton sx={{ p: 0 }}>
								<Avatar>
									{user
										? user?.first_name?.charAt(0) +
										  user?.last_name?.charAt(0)
										: ''}
								</Avatar>
							</IconButton>
							<IconButton sx={{ p: 2 }}>
								{['right'].map(() => (
									<React.Fragment key="right">
										<Button
											onClick={toggleDrawer(
												'right',
												true,
											)}
										>
											<ShoppingCartIcon />
										</Button>
										<SwipeableDrawer
											anchor="right"
											open={state.right}
											onClose={toggleDrawer(
												'right',
												false,
											)}
											onOpen={toggleDrawer('right', true)}
										>
											{list('right')}
										</SwipeableDrawer>
									</React.Fragment>
								))}
							</IconButton>
							<NavLink
								style={{
									textDecoration: 'none',
								}}
								to={'/login'}
							>
								Login
							</NavLink>
						</Box>
					</Box>
				</Container>
			</Paper>
			<Container sx={{ paddingTop: '50px' }}>
				<MediaCard />
			</Container>
		</>
	);
};
