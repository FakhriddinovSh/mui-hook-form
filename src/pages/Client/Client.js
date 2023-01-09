import { Fragment, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Drawer, Grid, Paper } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { ClientCard } from '../../components/CardItems/CardItems';
import axios from 'axios';
import { useCart } from 'react-use-cart';
import { Stack } from '@mui/system';
import { OrderedCard } from '../../components/Ordered/Ordered';
import { Modal } from '../../components/Modal/Modal';

export const Client = () => {
	const [products, setProducts] = useState([]);
	const { isEmpty, totalItems, emptyCart, items, cartTotal } = useCart();
	const [drawer, setDrawer] = useState(false);
	const [orderModal, setOrderModal] = useState(false);
	const { user } = useContext(UserContext);

	useEffect(() => {
		axios
			.get('http://localhost:8080/products')
			.then((res) => setProducts(res.data))
			.catch((error) => console.log(error));
	}, []);

	const handleOrder = () => {
		axios
			.post('http://localhost:8080/orders', {
				user_id: user.id,
				user_name: user.first_name,
				user_email: user.email,
				items: items,
				totalPrice: cartTotal,
			})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

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
							<IconButton sx={{ marginRight: '5px' }}>
								<Avatar>
									{user
										? user?.first_name?.charAt(0) +
										  user?.last_name?.charAt(0)
										: ''}
								</Avatar>
							</IconButton>

							<Badge badgeContent={totalItems} color="error">
								<IconButton
									sx={{ background: 'red', paddingX: '10px' }}
									onClick={() => setDrawer(true)}
								>
									<ShoppingCartIcon />
								</IconButton>
								<Drawer
									anchor="right"
									open={drawer}
									onClose={() => setDrawer(false)}
									sx={{ width: '300px' }}
								>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											padding: '20px',
											height: '100%',
										}}
										width={'400px'}
									>
										<Stack sx={{ flexGrow: 1 }}>
											{isEmpty ? (
												<Typography>
													Cart is empty
												</Typography>
											) : (
												''
											)}
											<Box>
												{items.map((item) => (
													<OrderedCard item={item} />
												))}
											</Box>
										</Stack>
										<Stack
											sx={{ marginTop: 'auto' }}
											spacing={2}
											direction="row"
										>
											<Button
												onClick={() => emptyCart()}
												variant="contained"
												color="error"
											>
												Clear cart
											</Button>
											<Button
												onClick={() =>
													setOrderModal(true)
												}
												variant="contained"
												color="success"
											>
												Order
											</Button>
											<Typography>
												Total: ${cartTotal}
											</Typography>
										</Stack>
									</Box>
								</Drawer>
							</Badge>
							<NavLink
								style={{
									textDecoration: 'none',
									marginLeft: '15px',
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
				<Grid container spacing={2}>
					{products.map((item) => (
						<Grid item xs={3}>
							<ClientCard item={item} />
						</Grid>
					))}
				</Grid>
			</Container>

			<Modal
				title="Are you sure? "
				modal={orderModal}
				setModal={setOrderModal}
			>
				<Stack direaction="row" spacing={3}>
					<Button
						onClick={() => setOrderModal(false)}
						variant="outlined"
						color="error"
					>
						No
					</Button>
					<Button
						onClick={() => {
							handleOrder();
							setOrderModal(false);
							emptyCart();
						}}
						variant="outlined"
						color="success"
					>
						Yes
					</Button>
				</Stack>
			</Modal>
		</>
	);
};
