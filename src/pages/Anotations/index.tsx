import FolderCopyRoundedIcon from '@mui/icons-material/FolderCopyRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import ResponsiveAppBar from '../../components/AppBar';
import CardAnotations from '../../components/CardAnotations';
import Section from '../../components/Section';

const Anotations = () => {
	return (
		<>
			<ResponsiveAppBar
				IconFile={FolderCopyRoundedIcon}
				IconHome={HomeOutlinedIcon}
			/>

			<Section />

			<CardAnotations archived={true} />
		</>
	);
};

export default Anotations;
