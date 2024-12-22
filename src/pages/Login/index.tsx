import { Container, Grid } from '@mui/material';

import FormLogin from './Components/FormLogin';
import LoginText from './Components/LoginText';
import { TextProps } from './types/TextProps';

const Login = () => {
	const phrases: TextProps[] = [
		{
			phrase: 'Faça suas anotações!',
		},
		{
			phrase: 'Organize suas demandas!',
		},
		{
			phrase: 'Bora codar!',
		},
	];

	return (

			<Grid container>
				<Grid
					xs={5}
					item
					sx={{
						backgroundColor: '#303f9f',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<LoginText phrases={phrases} />
				</Grid>
				<Grid
					xs={7}
					item
					sx={{
						backgroundColor: '#ece9e6',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<FormLogin />
				</Grid>
			</Grid>

	);
};

export default Login;
