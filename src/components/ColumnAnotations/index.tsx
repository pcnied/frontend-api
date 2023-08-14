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

	return (
		<>
			<Grid item xs={12}>
				<Typography
					variant="h3"
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					ANOTAÇÕES
				</Typography>
			</Grid>

			<Divider />

			{listAnotations
				.filter(
					(anotation) =>
						anotation._userId === JSON.parse(userLogged) &&
						anotation._archived === archived,
				)
				.map((anotation) => {
					return (
						<Grid key={anotation._id} item xs={12} md={3}>
							<ItemAnotation
								key={anotation._id}
								anotation={anotation}
							/>
						</Grid>
					);
				})}
		</>
	);
};

export default ColumnAnotation;
