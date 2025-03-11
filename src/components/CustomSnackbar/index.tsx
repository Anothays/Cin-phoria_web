'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

export default function CustomSnackbar() {
  const { isSnackbarVisible, closeSnackbar, snackbarContent, setSnackbarContent } =
    useGlobalContext();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
    setSnackbarContent(null);
  };

  return (
    <div>
      <Snackbar open={isSnackbarVisible} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbarContent}
        </Alert>
      </Snackbar>
    </div>
  );
}
