import FolderCopyRoundedIcon from '@mui/icons-material/FolderCopyRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Notification } from '../../components/Notification';

import ResponsiveAppBar from '../../components/AppBar';
import CardAnotations from '../../components/CardAnotations';

const Anotations = () => {
	return (
		<>
			<ResponsiveAppBar
				IconFile={FolderCopyRoundedIcon}
				IconHome={HomeOutlinedIcon}
			/>

			<CardAnotations archived={true} />
			<Notification />
		</>
	);
};

export default Anotations;
