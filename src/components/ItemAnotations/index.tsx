import { Delete, Edit, FolderTwoTone } from '@mui/icons-material';
import {
	Box,
	Divider,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { updateAnotation } from '../../store/modules/Anotations/anotationsSlice';
import Anotations from '../../types/Anotations';
import ModalAnotations from '../ModalAnotations';

interface ItemAnotationProps {
	anotation: Anotations;
}

const ItemAnotation: React.FC<ItemAnotationProps> = ({ anotation }) => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState(false);
	const [delet, setDelet] = useState(false);

	const dispatch = useAppDispatch();

	const handleArchived = () => {
		dispatch(
			updateAnotation({
				_archived: !anotation._archived,
				_userId: anotation._userId,
				_id: anotation._id,
			}),
		);
	};

	return (
		<>
			<Box
				key={anotation._id}
				sx={{
					border: '1px solid #E0E0E0',
					background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)',
					borderRadius: '10px',
					padding: '16px',
					boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
					transition: 'transform 0.2s ease',
					'&:hover': {
						transform: 'scale(1.02)',
					},
				}}
			>
				<Grid container flexDirection="column" spacing={2}>
					<Grid item xs={12}>
						<Typography
							variant="h5"
							sx={{
								wordWrap: 'break-word',
								color: '#333',
							}}
						>
							{anotation._title}
						</Typography>
					</Grid>

					<Divider
						sx={{
							width: '100%',
							backgroundColor: '#BDBDBD',
							marginY: '12px',
						}}
					/>

					<Grid item xs={12}>
						<Typography
							variant="body1"
							sx={{ wordWrap: 'break-word', color: '#555' }}
						>
							{anotation._description}
						</Typography>
					</Grid>

					<Grid item>
						<Typography
							variant="caption"
							sx={{
								color: '#9E9E9E',
								fontStyle: 'italic',
							}}
						>
							{anotation._date}
						</Typography>
					</Grid>

					<Grid item>
						<Stack direction="row" spacing={1}>
							<IconButton
								color="error"
								onClick={() => {
									setOpen(true);
									setDelet(false);
									setUpdate(true);
								}}
							>
								<Delete />
							</IconButton>

							<IconButton
								color="success"
								onClick={() => {
									setOpen(true);
									setUpdate(false);
									setDelet(true);
								}}
							>
								<Edit />
							</IconButton>

							<IconButton
								color="primary"
								onClick={handleArchived}
							>
								<FolderTwoTone />
							</IconButton>
						</Stack>
					</Grid>
				</Grid>
			</Box>

			<ModalAnotations
				context={update ? 'delete' : 'update'}
				open={open}
				setOpen={setOpen}
				anotationSelected={anotation}
			/>
		</>
	);
};

export default ItemAnotation;
