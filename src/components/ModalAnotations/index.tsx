import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	createAnotation,
	deleteAnotation,
	updateAnotation,
} from '../../store/modules/Anotations/anotationsSlice';
import { hideModal } from '../../store/modules/ModalAnotations';
import Anotations from '../../types/Anotations';

interface ModalAnotationsProps {
	anotationSelected?: Anotations;
	context: 'create' | 'update' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalAnotations: React.FC<ModalAnotationsProps> = ({
	anotationSelected,
	context,
	open,
	setOpen,
}) => {
	const id = useAppSelector((state) => state.users.user.id);
	const [title, setTitle] = useState(anotationSelected?._title || '');
	const [description, setDescription] = useState(
		anotationSelected?._description || '',
	);
	const [date, setDate] = useState(anotationSelected?._date || '');

	useEffect(() => {
		console.log(anotationSelected);
	}, [anotationSelected]);

	const dispatch = useAppDispatch();

	const handleConfirm = () => {
		dispatch(hideModal());
		switch (context) {
			case 'create': {
				const newAnotation: Omit<Anotations, '_id'> = {
					_title: title,
					_date: date,
					_description: description,
					_userId: JSON.parse(
						(sessionStorage.getItem('userLogged') ??
							localStorage.getItem('userLogged')) as string,
					),
				};

				dispatch(createAnotation(newAnotation));

				clearInputs();
				setOpen(false);
				break;
			}
			case 'update':
				if (anotationSelected) {
					dispatch(
						updateAnotation({
							_id: anotationSelected._id,
							_userId: id,
							_title: title,
							_description: description,
							_date: date,
						}),
					);
				}
				setOpen(false);
				break;

			case 'delete':
				if (anotationSelected) {
					dispatch(
						deleteAnotation({
							userId: anotationSelected._userId,
							idAnotation: anotationSelected._id,
						}),
					);
				}
				break;
		}
	};

	const clearInputs = () => {
		setTitle('');
		setDescription('');
		setDate('');
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{context === 'create' && 'Criar Anotação'}
				{context === 'update' && 'Modificar Anotação'}
				{context === 'delete' && 'Deletar Anotação'}
			</DialogTitle>
			<Divider />
			<DialogContent>
				{context !== 'delete' && (
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								onChange={(event) =>
									setTitle(event.target.value)
								}
								value={title}
								fullWidth
								label="Título"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(event) =>
									setDescription(event.target.value)
								}
								value={description}
								fullWidth
								label="Descrição"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(event) =>
									setDate(event.target.value)
								}
								value={date}
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
								label="Data"
								type="date"
							/>
						</Grid>
					</Grid>
				)}

				{context === 'delete' && (
					<DialogContentText id="alert-dialog-description">
						Deseja realmente excluir? Essa ação não poderá ser
						modificada.
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
				<Button variant="contained" onClick={handleConfirm} autoFocus>
					Concluir
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalAnotations;
