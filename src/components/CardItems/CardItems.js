import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Modal } from '../Modal/Modal';
import { DialogActions, DialogContent, TextField } from '@mui/material';

export const AdminCard = ({ item }) => {
	const { product_image, product_price, product_name, id, category_id } =
		item;
	const [editOrdersModal, setEditOrdersModal] = React.useState(false);
	const [categoryId, setID] = React.useState(0);
	const editNameRef = React.useRef('');
	const editPriceRef = React.useRef('');
	const editImageRef = React.useRef('');

	const editBtn = (id) => {
		setID(id);
	};

	const submitEditHandler = (evt) => {
		evt.preventDefault();
		axios
			.put(`http://localhost:8080/products/${categoryId}`, {
				product_name: editNameRef.current.value,
				product_price: editPriceRef.current.value,
				product_image: editImageRef.current.value,
				category_id: category_id,
			})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	const deleteHandler = (id) => {
		axios
			.delete(`http://localhost:8080/products/${id}`)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	return (
		<>
			<Card sx={{ width: 345 }}>
				<CardMedia
					sx={{ height: 345, width: '100%' }}
					image={product_image}
					title="green iguana"
					shadow
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{product_name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Price: ${product_price}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						onClick={() => {
							editBtn(id);
							setEditOrdersModal(true);
						}}
						size="small"
					>
						Edit
					</Button>
					<Button onClick={() => deleteHandler(id)} size="small">
						Delete
					</Button>
				</CardActions>
			</Card>

			<Modal
				modal={editOrdersModal}
				setModal={setEditOrdersModal}
				title="Edit Category Name"
			>
				<form onSubmit={submitEditHandler}>
					<DialogContent dividers>
						<TextField
							inputRef={editImageRef}
							sx={{ width: '350px' }}
							label="Edit Image"
						/>
						<TextField
							inputRef={editNameRef}
							sx={{ width: '350px' }}
							label="Edit Name"
						/>
						<TextField
							inputRef={editPriceRef}
							sx={{ width: '350px' }}
							label="Edit Price"
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => setEditOrdersModal(false)}
							type="submit"
							variant="contained"
						>
							Edit
						</Button>
					</DialogActions>
				</form>
			</Modal>
		</>
	);
};

export const ClientCard = ({ item }) => {
	const { addItem } = useCart();
	const { product_image, product_price, product_name, id } = item;
	const navigate = useNavigate();
	const { token } = React.useContext(AuthContext);

	const handleAddItem = () => {
		if (token) {
			addItem({ ...item, price: product_price });
		} else {
			navigate('/login');
		}
	};

	return (
		<Card sx={{ maxWidth: 345 }} shadow>
			<CardMedia
				sx={{ height: 240 }}
				image={product_image}
				title="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{product_name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Price: ${product_price}
				</Typography>
				<Button
					onClick={() => handleAddItem()}
					sx={{ marginTop: '20px' }}
					variant="contained"
				>
					Add to cart
				</Button>
			</CardContent>
		</Card>
	);
};
