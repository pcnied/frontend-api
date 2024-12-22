import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
	palette: {
		primary: {
			main: '#3f51b5',
			dark: '#303f9f',
		},
		background: {
			paper: '#f5f5f5',
		},
	},
});

export default myTheme;