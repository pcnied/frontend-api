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
		<Container
			sx={{
				height: '100vh',
			}}
		>
			<Grid container>
				<Grid
					xs={6}
					item
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
					}}
					gap={3}
				>
					<LoginText phrases={phrases} />
					{/* <Box sx={{ display: 'flex', marginRight: '50px' }}>
						<LoginImage src={sapoFoda} />
					</Box> */}
				</Grid>
				<Grid
					xs={6}
					item
					sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '100vh',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<FormLogin />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Login;
