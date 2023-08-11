import { Box } from '@mui/material';

interface ImageProps {
	src: string;
}

const LoginImage: React.FC<ImageProps> = ({ src }) => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
				}}
			>
				<Box
					component={'img'}
					src={src}
					sx={{
						display: 'flex',
						width: '200px',
						borderRadius: '10px',
						marginTop: '20px',
					}}
				/>
			</Box>
		</>
	);
};

export default LoginImage;
