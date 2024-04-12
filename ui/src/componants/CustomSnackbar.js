import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomSnackbar({openAlert,setOpenAlert}) {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert({
      ...openAlert,
      open: false
    });
  };

  return (
      <Snackbar open={openAlert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={openAlert.msgType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {openAlert.msg}
        </Alert>
      </Snackbar>
  );
}