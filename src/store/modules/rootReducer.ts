import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../modules/ModalAnotations';
import anotationsSlice from './Anotations/anotationsSlice';
import notificationsSlice from './Notification/notificationSlice';
import usersSlice from './User/usersSlice';

const rootReducer = combineReducers({
	// contacts:
	users: usersSlice,
	modal: modalSlice,
	anotations: anotationsSlice,
	notification: notificationsSlice,
});

export default rootReducer;
