import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../../components/Layout';
import Anotations from '../../pages/Anotations';
import Home from '../../pages/Home';
import Login from '../../pages/Login';

const AppRoutes: React.FC = () => {
	return (
		<Layout>
			<BrowserRouter>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/" element={<Login />} />
					<Route path="/anotations" element={<Anotations />} />
				</Routes>
			</BrowserRouter>
		</Layout>
	);
};

export default AppRoutes;
