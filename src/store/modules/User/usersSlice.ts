import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import serviceAPI from '../../../configs/services/integration.api';
import { CreateUser, UserLogged } from '../../../pages/Login/types/user';
import { showNotification } from '../Notification/notificationSlice';

export const createUser = createAsyncThunk(
	'users/createUser',
	async (newUser: CreateUser, { dispatch }) => {
		try {
			const response = await serviceAPI.post('/users/signup', {
				name: newUser.name,
				email: newUser.email,
				password: newUser.password,
			});

			dispatch(
				showNotification({
					status: response.data.status,
					success: true,
				}),
			);

			return response.data;
		} catch (error: any) {
			dispatch(
				showNotification({
					status: error.response.data.status,
					success: false,
				}),
			);
			return error.response.data;
		}
	},
);

export const loginUser = createAsyncThunk(
	'users/login',
	async (infoLogin: UserLogged, { dispatch }) => {
		try {
			const response = await serviceAPI.post('/users/signin', {
				email: infoLogin.email,
				password: infoLogin.password,
			});

			dispatch(
				showNotification({
					status: response.data.status,
					success: true,
				}),
			);

			return response.data;
		} catch (error: any) {
			dispatch(
				showNotification({
					status: error.response.data.status,
					success: false,
				}),
			);
			return error.response.data;
		}
	},
);

export const logoutUser = createAsyncThunk(
	'users/logout',
	async (_, { dispatch }) => {
		sessionStorage.removeItem('userLogged');

		dispatch(
			showNotification({
				status: 'Logout realizado com sucesso!',
				success: true,
			}),
		);
		return;
	},
);

const initialState = {
	user: {
		name: '',
		id: '',
	},
	loading: false,
};

const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = initialState.user;
		},
	},
	extraReducers: (builder) => {
		// CREATE USER
		builder.addCase(createUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createUser.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(createUser.rejected, (state) => {
			state.loading = false;
		});

		// LOGIN USER
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;

			if (action.payload.success) {
				sessionStorage.setItem(
					'userLogged',
					JSON.stringify(action.payload.id),
				);
				state.user.id = action.payload.id;
				state.user.name = action.payload.name;
			}
		});
		builder.addCase(loginUser.rejected, (state) => {
			state.loading = false;
		});

		// LOGOUT USER
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.user = initialState.user;
		});
	},
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
