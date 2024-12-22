import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Notification {
	show: boolean;
	status: string;
	success: boolean;
}

const initialState: Notification = {
	show: false,
	status: '',
	success: false,
};

const notificationsSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification(
			state,
			action: PayloadAction<Omit<Notification, 'show'>>,
		) {
			return {
				show: true,
				...action.payload,
			};
		},
		hideNotification() {
			return initialState;
		},
	},
});

export const { showNotification, hideNotification } =
	notificationsSlice.actions;
export default notificationsSlice.reducer;
