import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { Grid } from '@mui/material';

import ResponsiveAppBar from '../../components/AppBar';
import CardAnotations from '../../components/CardAnotations';
import { Notification } from '../../components/Notification';

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

				<CardAnotations archived={false} />
				<Notification />
			</Grid>
		</>
	);
};

export default Home;
