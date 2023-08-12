import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SnackBarComp } from '../../../../components/SnackBar';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { loginUser } from '../../../../store/modules/User/usersSlice';
import { User } from '../../types/user';
import ModalOpen from '../ModalRegister';

const FormLogin = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { message: messageSlice } = useAppSelector(
		(state) => state.notification,
	);

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const user: User = {
			email,
			password,
		};

		dispatch(loginUser(user));

		setEmail('');
		setPassword('');
	};

	const handleClickOpen = () => {
		setIsOpen(true);
	};

	useEffect(() => {
		const token = sessionStorage.getItem('userLogged');
		if (token) {
			navigate('/home');
		}
	}, [navigate]);

	useEffect(() => {
		if (messageSlice === 'Login efetuado com sucesso!') {
			navigate('/home');
		}
		console.log(messageSlice);
	}, [messageSlice, navigate]);

	return (
		<>
			<Box
				component={'form'}
				sx={{
					maxWidth: '100%',
					maxHeight: '100%',
					background: 'white',
					display: 'flex',
					alignItems: 'center',
					padding: '30px',
					borderRadius: '10px',
				}}
				onSubmit={handleSubmit}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							type="email"
							helperText="Insira o e-mail cadastrado na criação de sua conta."
							label="E-mail"
							fullWidth
							onChange={(event) => {
								setEmail(event.currentTarget.value);
							}}
							value={email}
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type="password"
							helperText="Insira a senha cadastrada na criação de sua conta."
							label="Senha"
							fullWidth
							onChange={(event) => {
								setPassword(event.currentTarget.value);
							}}
							value={password}
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							fullWidth
							type="submit"
							sx={{
								display: 'block',
								margin: '0 auto',
								width: '130px',
							}}
						>
							Entrar
						</Button>
					</Grid>
					<Grid item xs={12} textAlign={'center'}>
						<Typography variant="caption" fontSize={'20px'}>
							Ainda não tem conta?{' '}
							<Link
								component={'button'}
								type="button"
								sx={{ textDecoration: 'none' }}
								onClick={handleClickOpen}
							>
								Criar Conta.
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<SnackBarComp />
			<ModalOpen open={isOpen} changeState={setIsOpen} />
		</>
	);
};

export default FormLogin;
