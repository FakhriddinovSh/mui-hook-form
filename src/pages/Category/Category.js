import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import axios from 'axios';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Category = () => {
	const [category, setCategory] = useState([]);
	const [categoryModal, setCategoryModal] = useState(false);
	const categoryRef = useRef();
	const editRef = useRef();
	const [editOrdersModal, setEditOrdersModal] = useState(false);
	const [categoryId, setID] = useState(0);

	const editBtn = (id) => {
		setID(id);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post('http://localhost:8080/category', {
				category_name: categoryRef.current.value,
			})
			.then((res) => (res.status === 201 ? setCategoryModal(false) : ''))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios
			.get('http://localhost:8080/category')
			.then((res) => setCategory(res.data))
			.catch((error) => console.log(error));
	}, []);

	const submitEditHandler = (evt) => {
		evt.preventDefault();
		axios
			.put(`http://localhost:8080/category/${categoryId}`, {
				category_name: editRef.current.value,
			})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	const deleteHandler = (id) => {
		axios
			.delete(`http://localhost:8080/category/${id}`)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	return (
		<>
			<Box sx={{ padding: '32px' }}>
				<Button
					onClick={() => setCategoryModal(true)}
					variant="contained"
					endIcon={<AddIcon />}
				>
					Add Category
				</Button>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Category Name</TableCell>
								<TableCell>Category Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{category.map((item) => {
								return (
									<TableRow>
										<TableCell>{item.id}</TableCell>
										<TableCell>
											{item.category_name}
										</TableCell>
										<TableCell>
											<Stack direction="row" spacing={2}>
												<IconButton
													onClick={() => {
														editBtn(item.id);
														setEditOrdersModal(
															true,
														);
													}}
												>
													<EditIcon />
												</IconButton>
												<IconButton
													onClick={() =>
														deleteHandler(item.id)
													}
												>
													<DeleteIcon />
												</IconButton>
											</Stack>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Modal
				modal={categoryModal}
				setModal={setCategoryModal}
				title="Add category"
			>
				<form onSubmit={handleSubmit}>
					<DialogContent dividers>
						<TextField
							inputRef={categoryRef}
							sx={{ width: '350px' }}
							label="Category name"
						/>
					</DialogContent>
					<DialogActions>
						<Button type="submit" variant="contained">
							Add
						</Button>
					</DialogActions>
				</form>
			</Modal>

			<Modal
				modal={editOrdersModal}
				setModal={setEditOrdersModal}
				title="Edit Category Name"
			>
				<form onSubmit={submitEditHandler}>
					<DialogContent dividers>
						<TextField
							inputRef={editRef}
							sx={{ width: '350px' }}
							label="Edit Category"
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
