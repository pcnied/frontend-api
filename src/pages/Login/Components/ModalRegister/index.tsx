import { Close } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { SnackBarComp } from '../../../../components/SnackBar';
import { useAppDispatch } from '../../../../store/hooks';
import { createUser } from '../../../../store/modules/User/usersSlice';
import { emailRegex } from '../../../../utils/validators/regexDados';
import { IsValidCredentials } from '../../types/IsValidCredentials';
import { CreateUser } from '../../types/user';

interface ModalOpenProps {
	open: boolean;
	changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalOpen: React.FC<ModalOpenProps> = ({ open, changeState }) => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState(false);
	const [message, setMessage] = useState<string>('');

	const dispatch = useAppDispatch();

	const [errorEmail, setErrorEmail] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});
	const [errorSenha, setErrorPassword] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});
	const [errorName, setErrorName] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	useEffect(() => {
		if (email.length && !emailRegex.test(email)) {
			setErrorEmail({
				helperText: 'Informe um e-mail válido.',
				isValid: false,
			});
		} else {
			setErrorEmail({
				helperText: 'Utilize seu e-mail para criar uma conta.',
				isValid: true,
			});
		}
	}, [email]);

	useEffect(() => {
		if (password.length && password.length < 6) {
			setErrorPassword({
				helperText: 'Cadastre uma senha com no mínimo 6 caracteres.',
				isValid: false,
			});
		} else {
			setErrorPassword({
				helperText:
					'Utilize uma senha fácil de lembrar e anote para não esquecer.',
				isValid: true,
			});
		}
	}, [password]);

	useEffect(() => {
		if (name.length && name.length < 3) {
			setErrorName({
				helperText: 'Cadastre um nome com no mínimo 3 caracteres.',
				isValid: false,
			});
		} else {
			setErrorName({
				helperText: 'Utilize um nome ou apelido.',
				isValid: true,
			});
		}
	}, [name]);

	const handleClose = () => {
		changeState(false);
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const user: CreateUser = {
			name,
			email,
			password,
		};

		dispatch(createUser(user));

		setName('');
		setEmail('');
		setPassword('');

		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{'Crie sua conta'}
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<Close />
				</IconButton>
			</DialogTitle>
			<Divider />
			<Box
				component={'form'}
				sx={{ maxWidth: '100%' }}
				onSubmit={handleSubmit}
			>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Nome"
								type="text"
								fullWidth
								required
								error={!errorName.isValid}
								helperText={errorName.helperText}
								onChange={(event) => {
									setName(event.currentTarget.value);
								}}
								value={name}
							></TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="E-mail"
								type="email"
								fullWidth
								required
								error={!errorEmail.isValid}
								helperText={errorEmail.helperText}
								onChange={(event) => {
									setEmail(event.currentTarget.value);
								}}
								value={email}
							></TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Senha"
								type="password"
								fullWidth
								required
								inputProps={{ minLenght: 6 }}
								error={!errorSenha.isValid}
								helperText={errorSenha.helperText}
								onChange={(event) => {
									setPassword(event.currentTarget.value);
								}}
								value={password}
							></TextField>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions sx={{ paddingY: '20px' }}>
					<Button
						type="button"
						variant="outlined"
						onClick={handleClose}
					>
						Cancelar
					</Button>
					<Button type="submit" variant="contained" autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Box>
			<SnackBarComp />
		</Dialog>
	);
};

export default ModalOpen;
