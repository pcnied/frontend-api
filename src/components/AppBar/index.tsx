import { LogoutOutlined } from '@mui/icons-material';
import { Grid, IconButton, SvgIconTypeMap, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import { getAnotation } from '../../store/modules/Anotations/anotationsSlice';
import { logoutUser } from '../../store/modules/User/usersSlice';

interface ResponsiveAppBarProps {
	IconHome: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
		muiName: string;
	};
	IconFile: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
		muiName: string;
	};
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
	IconFile,
	IconHome,
}) => {
	const navigate = useNavigate();
	const [filterTitle, setFilterTitle] = useState<string>("");
	const [userLogged, setUserLogged] = useState(
		sessionStorage.getItem('userLogged') as string,
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			getAnotation({
				title: filterTitle,
				userId: JSON.parse(userLogged),
			}),
		);
	}, [dispatch, filterTitle, userLogged]);

	useEffect(() => {
		const userId = userLogged ? JSON.parse(userLogged)?.userId : null;

		if (!userId) {
			return;
		}

		dispatch(getAnotation({ title: filterTitle, userId: JSON.parse(userLogged), }));
	}, [dispatch, filterTitle, userLogged]);

	useEffect(() => {
		const handleStorageChange = () => {
			const token = sessionStorage.getItem('userLogged');
			if (!token) {
				navigate('/');
			}
		};

		window.addEventListener('storage', handleStorageChange);

		handleStorageChange();

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [navigate]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					background: 'white',
					height: '85px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Toolbar
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<IconButton
						onClick={() => navigate('/home')}
						sx={{ color: 'black' }}
					>
						<IconHome />
					</IconButton>
					<IconButton
						onClick={() => navigate('/anotations')}
						sx={{ color: 'black' }}
					>
						<IconFile />
					</IconButton>
					<Grid>
						<TextField
							onChange={(ev) => setFilterTitle(ev.target.value)}
							value={filterTitle}
							label={'Procurar anotação...'}
							sx={{
								width: '500px',

							}}
						></TextField>
					</Grid>
					<IconButton
						sx={{ color: 'black' }}
						onClick={async () => {
							sessionStorage.removeItem('userLogged');

							await dispatch(logoutUser());

							setFilterTitle('');
							navigate('/');
						}}
					>
						<LogoutOutlined />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default ResponsiveAppBar;
