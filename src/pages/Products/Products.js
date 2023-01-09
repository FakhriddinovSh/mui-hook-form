import {
	Button,
	DialogActions,
	DialogContent,
	MenuItem,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Modal } from '../../components/Modal/Modal';
import { AdminCard } from '../../components/CardItems/CardItems';

export const Products = () => {
	const [category, setCategory] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8080/category')
			.then((res) => setCategory(res.data))
			.catch((error) => console.log(error));
	}, []);

	const categoryRef = useRef('');
	const nameRef = useRef('');
	const priceRef = useRef('');
	const imageRef = useRef('');

	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
	};

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const [value, setValue] = useState(0);
	const [productModal, setProductModal] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post('http://localhost:8080/products', {
				product_name: nameRef.current.value,
				product_price: priceRef.current.value,
				product_image: imageRef.current.value,
				category_id: categoryRef.current.value,
			})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		axios
			.get('http://localhost:8080/products')
			.then((res) => setProducts(res.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<Box sx={{ padding: '32px' }}>
			<Button
				onClick={() => setProductModal(true)}
				variant="contained"
				endIcon={<AddIcon />}
			>
				Add Product
			</Button>

			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						{category.map((item) => (
							<Tab
								label={item.category_name}
								{...a11yProps(item.id)}
							/>
						))}
					</Tabs>
				</Box>
				<Box display="flex" flexWrap="wrap">
					{products.map((item) => (
						<TabPanel value={value} index={item.category_id - 1}>
							<AdminCard item={item} />
						</TabPanel>
					))}
				</Box>
			</Box>

			<Modal
				title="Add Product"
				modal={productModal}
				setModal={setProductModal}
			>
				<form onSubmit={handleSubmit}>
					<DialogContent dividers>
						<Stack spacing={2}>
							<TextField
								inputRef={nameRef}
								sx={{ width: '350px' }}
								label="Product name"
							/>
							<TextField
								inputRef={priceRef}
								sx={{ width: '350px' }}
								label="Product price"
							/>
							<TextField
								inputRef={imageRef}
								sx={{ width: '350px' }}
								label="Product image url"
							/>
							<TextField
								inputRef={categoryRef}
								sx={{ width: '350px' }}
								label="Product category"
								select
							>
								{category.map((item) => (
									<MenuItem value={item.id}>
										{item.category_name}
									</MenuItem>
								))}
							</TextField>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button type="submit" variant="contained">
							Add
						</Button>
					</DialogActions>
				</form>
			</Modal>
		</Box>
	);
};
