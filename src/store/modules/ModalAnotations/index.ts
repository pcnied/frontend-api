import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalProps {
	open: boolean;
	context: 'create' | 'update' | 'delete';
}

const initialState: ModalProps = {
	open: false,
	context: 'create',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal: (
			state,
			action: PayloadAction<'create' | 'update' | 'delete'>,
		) => {
			return {
				open: true,
				context: action.payload,
			};
		},
		hideModal: (state) => {
			return {
				...state,
				open: false,
			};
		},
	},
});
export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
