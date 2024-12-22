import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Notification } from '../../../../components/Notification';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { loginUser } from '../../../../store/modules/User/usersSlice';
import { UserLogged } from '../../types/user';
import ModalOpen from '../ModalRegister';

const FormLogin = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const id = useAppSelector((state) => state.users.user.id);

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const user: UserLogged = {
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
		if (id) {
			// A navegação deve ocorrer após a exibição da notificação
			setTimeout(() => {
				navigate('/home');
			}, 1000); // Aguarda 1 segundo para garantir que a notificação seja exibida
		}
	}, [id, navigate]);

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				background: '#ece9e6',
				padding: 5,
			}}
		>
			<Box
				component="form"
				sx={{
					maxWidth: 500,
					width: '100%',
					backgroundColor: 'white',
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					padding: 4,
					borderRadius: 3,
					boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
					transition: 'box-shadow 0.3s ease',
					'&:hover': {
						boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
					},
				}}
				onSubmit={handleSubmit}
			>
				<Typography
					variant="h5"
					textAlign="center"
					fontWeight="bold"
					color="primary.main"
				>
					Login
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							type="email"
							label="E-mail"
							helperText="Insira o e-mail cadastrado na criação de sua conta."
							fullWidth
							onChange={(event) => setEmail(event.currentTarget.value)}
							value={email}
							InputProps={{
								sx: {
									'&:focus-within fieldset': {
										borderColor: 'primary.main',
									},
								},
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type="password"
							label="Senha"
							helperText="Insira a senha cadastrada na criação de sua conta."
							fullWidth
							onChange={(event) => setPassword(event.currentTarget.value)}
							value={password}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							fullWidth
							type="submit"
							sx={{
								padding: '12px 24px',
								background:
									'linear-gradient(to right, #6a11cb, #2575fc)',
								color: '#fff',
								borderRadius: '8px',
								fontSize: '16px',
								fontWeight: 500,
								textTransform: 'none',
								boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
								transition: 'transform 0.2s, box-shadow 0.2s',
								'&:hover': {
									transform: 'translateY(-3px)',
									boxShadow:
										'0px 6px 14px rgba(0, 0, 0, 0.25)',
								},
								'&:active': {
									transform: 'translateY(1px)',
									boxShadow:
										'0px 2px 5px rgba(0, 0, 0, 0.15)',
								},
							}}
						>
							Entrar
						</Button>
					</Grid>
					<Grid item xs={12} textAlign="center">
						<Typography variant="body2">
							Ainda não tem conta?{' '}
							<Link
								component="button"
								type="button"
								sx={{
									textDecoration: 'none',
									color: '#2575fc',
									fontWeight: 'bold',
									cursor: 'pointer',
									'&:hover': {
										color: '#000',
									},
								}}
								onClick={handleClickOpen}
							>
								Criar Conta
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Notification />
			<ModalOpen open={isOpen} changeState={setIsOpen} />
		</Box>
	);
};

export default FormLogin;
