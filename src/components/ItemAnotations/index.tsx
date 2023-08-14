import { Delete, Edit, FolderTwoTone } from '@mui/icons-material';
import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
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
			<Grid
				key={anotation._id}
				container
				marginY={2}
				flexDirection="column"
				sx={{
					border: '1px solid black',
					borderRadius: '5px',
					padding: '10px',
					maxWidth: '100%',
				}}
			>
				<Grid xs={12}>
					<Typography sx={{ wordWrap: 'break-word' }} variant="h5">
						{anotation._title}
					</Typography>
				</Grid>
				<Divider
					sx={{
						width: '100%',
						background: 'black',
						marginY: '8px',
						display: 'flex',
						justifyContent: 'center',
					}}
				></Divider>
				<Grid item xs={12}>
					<Typography sx={{ wordWrap: 'break-word' }}>
						{anotation._description}
					</Typography>
				</Grid>
				<Grid item>
					<Typography>{anotation._date}</Typography>
				</Grid>
				<Grid item>
					<Stack direction="row" spacing={2}>
						<IconButton
							color="error"
							aria-label="delete"
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
							aria-label="edit"
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
							aria-label="edit"
							onClick={handleArchived}
						>
							<FolderTwoTone />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>
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
