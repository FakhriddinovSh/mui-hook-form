import {
	Button,
	List,
	ListItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';

export const Order = () => {
	const [orders, setOrders] = useState([]);
	const [singleOrders, setSingleOrders] = useState([]);
	const [ordersModal, setOrdersModal] = useState(false);

	useEffect(() => {
		axios
			.get('http://localhost:8080/orders')
			.then((res) => setOrders(res.data))
			.catch((error) => console.log(error));
	}, []);

	const getSingleUserOrder = (id) => {
		axios
			.get(`http://localhost:8080/orders?user_id=${id}`)
			.then((res) => setSingleOrders(res.data))
			.catch((error) => console.log(error));
	};

	return (
		<Box sx={{ padding: '32px' }}>
			<Typography variant="h4">Orders</Typography>
			<List>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>User ID</TableCell>
								<TableCell>User Name</TableCell>
								<TableCell>Orders</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((item) => {
								return (
									<TableRow>
										<TableCell>{item.id}</TableCell>
										<TableCell>{item.user_name}</TableCell>
										<TableCell>
											<Button
												onClick={() => {
													setOrdersModal(true);
													getSingleUserOrder(
														item.user_id,
													);
												}}
												variant="contained"
											>
												Show
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</List>

			<Modal
				modal={ordersModal}
				setModal={setOrdersModal}
				title="Users Ordered Products"
			>
				<List>
					{singleOrders.map((item) => {
						const Items = item.items;
						return (
							<>
								{Items.map((item) => (
									<ListItem>{item.product_name}</ListItem>
								))}
							</>
						);
					})}
				</List>
			</Modal>
		</Box>
	);
};
