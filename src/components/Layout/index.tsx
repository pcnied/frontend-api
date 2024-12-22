import { Box } from '@mui/material';
import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				padding: '0px',
				margin: '0px',
				zIndex: '-1',
				minHeight: '100vh',
				maxWidth: '100vw',
				background: '#303f9f',
			}}
		>
			{children}
		</Box>
	);
};

export default Layout;
