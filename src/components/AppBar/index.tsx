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

interface ResponsiveAppBarProps {
	IconHome: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
		muiName: string;
	};
	IconFile: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
		muiName: string;
	};
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
	IconFile,
	IconHome,
}) => {
	const navigate = useNavigate();
	const [filterTitle, setFilterTitle] = useState<string>();
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
	}, [filterTitle]);

	useEffect(() => {
		const token = sessionStorage.getItem('userLogged');
		if (!token) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					background: 'white',
					height: '90px',
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
					<IconButton sx={{ color: 'black' }}>
						<LogoutOutlined
							onClick={() => {
								sessionStorage.removeItem('userLogged');
								navigate('/');
							}}
						/>
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default ResponsiveAppBar;
