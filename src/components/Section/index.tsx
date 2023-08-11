import { Grid } from '@mui/material';
import React from 'react';

const Section: React.FC = () => {
	return (
		<Grid container>
			<Grid
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
				xs={6}
				item
			></Grid>
			<Grid xs={6} item></Grid>
		</Grid>
	);
};

export default Section;
