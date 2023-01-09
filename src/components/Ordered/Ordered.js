import {
	Avatar,
	Button,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useCart } from 'react-use-cart';

export const OrderedCard = ({ item }) => {
	const { product_name, product_price, id, quantity } = item;
	const { updateItemQuantity, removeItem, totalItems } = useCart();

	return (
		<ListItem divider sx={{ display: 'block' }}>
			<Stack mb="10px" direction="row" spacing={2}>
				<ListItemAvatar>
					<Avatar></Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={product_name}
					secondary={`$${product_price}`}
				></ListItemText>
			</Stack>
			<Box>
				<Stack direction="row" spacing={2} mb="10px">
					<Button
						onClick={() => updateItemQuantity(id, quantity - 1)}
						variant="contained"
						size="small"
					>
						-
					</Button>
					<Typography>{quantity}</Typography>
					<Button
						onClick={() => updateItemQuantity(id, quantity + 1)}
						variant="contained"
						size="small"
					>
						+
					</Button>
					<Button
						onClick={() => removeItem(id)}
						variant="contained"
						size="small"
					>
						Remove all
					</Button>
				</Stack>
			</Box>
		</ListItem>
	);
};
