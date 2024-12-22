import { Alert, Fade, Slide } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { hideNotification } from '../../store/modules/Notification/notificationSlice';

const SlideTransition = (props: any) => {
  return <Slide {...props} direction="up" />; // Define a direção do deslizamento
};

export const Notification: React.FC = () => {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={notification.show}
      onClose={handleClose}
      autoHideDuration={3000}
			TransitionComponent={SlideTransition}
    >
      {notification.status ? (
        <Alert
          severity={notification.success ? 'success' : 'error'}
          onClose={handleClose}
        >
          {notification.status}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};
