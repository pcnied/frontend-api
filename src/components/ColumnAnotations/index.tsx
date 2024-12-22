import { Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	getAnotation,
	listAllAnotations,
} from '../../store/modules/Anotations/anotationsSlice';
import ItemAnotation from '../ItemAnotations';

export interface ArchivedProps {
	archived: boolean;
}

const ColumnAnotation: React.FC<ArchivedProps> = ({ archived }) => {
	const dispatch = useAppDispatch();
	const listAnotations = useAppSelector(listAllAnotations);

	const [userLogged, setUserLogged] = useState(
		sessionStorage.getItem('userLogged') as string,
	);

	useEffect(() => {
		dispatch(
			getAnotation({
				archived: archived,
				userId: JSON.parse(userLogged),
			}),
		);
		console.log(listAnotations);
	}, []);

	const filteredAnotations = listAnotations.filter(
		(anotation) =>
			anotation._userId === JSON.parse(userLogged) &&
			anotation._archived === archived,
	);

	return (
		<>
			<Grid item xs={12}>
				<Typography
					variant="h4"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '16px',
					}}
				>
					{archived ? 'ANOTAÇÕES ARQUIVADAS' : 'ANOTAÇÕES'}
				</Typography>
			</Grid>

			<Grid container spacing={2} sx={{ justifyContent: 'center', padding: '16px' }}>
				{filteredAnotations.length > 0 ? (
					filteredAnotations.map((anotation) => (
						<Grid key={anotation._id} item xs={12} md={3} sm={6} margin={'8px'}>
							<ItemAnotation key={anotation._id} anotation={anotation} />
						</Grid>
					))
				) : (
					<Grid
					item
					xs={12}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography
						sx={{
							fontSize: '16px',
							color: '#757575',
							marginTop: '12px',
						}}
					>
						Nenhuma anotação encontrada.
					</Typography>
				</Grid>
				)}
			</Grid>
		</>
	);
};

export default ColumnAnotation;
