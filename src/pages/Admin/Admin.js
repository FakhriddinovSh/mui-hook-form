import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BarChartIcon from '@mui/icons-material/BarChart';
// import CommentIcon from '@mui/icons-material/Comment';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Box, List, ListItem, Typography } from '@mui/material';
// import { padding } from '@mui/system';
import { Order } from '../Order/Order';
import { Category } from '../Category/Category';
import { Products } from '../Products/Products';

export const Admin = () => {
	const menuItem = [
		{
			path: 'order',
			name: 'Order',
			icon: <DashboardIcon />,
		},
		{
			path: 'category',
			name: 'Category',
			icon: <ManageAccountsIcon />,
		},
		{
			path: 'products',
			name: 'Products',
			icon: <BarChartIcon />,
		},
	];

	return (
		<Box display="flex">
			<Box sx={{ padding: 2, border: 1, width: '15%', height: '100vh' }}>
				<Typography>Admin Dashboard</Typography>
				<List className="list-unstyled">
					{menuItem.map((item) => (
						<ListItem>
							{item.icon}
							<NavLink
								className="ms-2 text-decoration-none"
								to={item.path}
							>
								{item.name}
							</NavLink>
						</ListItem>
					))}
				</List>
			</Box>
			<Box>
				<Box
					sx={{
						background: 'darkcyan',
						width: '85vw',
						height: '80px',
					}}
				>
					<h2>Admin page</h2>
				</Box>

				<div>
					<Routes>
						<Route path="order" element={<Order />} />
						<Route path="category" element={<Category />} />
						<Route path="products" element={<Products />} />
					</Routes>
				</div>
			</Box>
		</Box>
	);
};
