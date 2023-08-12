import { Box } from '@mui/material';
import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const background = '#191970';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				padding: '0px',
				margin: '0px',
				zIndex: '-1',
				minHeight: '100vh',
				minWidth: '100%',
				background: '#008B8B',
			}}
		>
			{children}
		</Box>
	);
};

export default Layout;
