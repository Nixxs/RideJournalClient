import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CommentsModal = ({ open, handleClose, eventDetails}) => {
  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none',
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Comments
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          comment content goes here
        </Typography>
        <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CommentsModal;
