import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { Grid } from '@mui/material';

import ResponsiveAppBar from '../../components/AppBar';
import CardAnotations from '../../components/CardAnotations';
import Section from '../../components/Section';

const Home = () => {
	return (
		<>
			<ResponsiveAppBar
				IconFile={FolderCopyOutlinedIcon}
				IconHome={HomeIcon}
			/>
			<Grid
				container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Section />

				<CardAnotations archived={false} />
			</Grid>
		</>
	);
};

export default Home;
