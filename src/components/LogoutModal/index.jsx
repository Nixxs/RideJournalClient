// LoginModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useAuth } from '../../features/AuthManager';
import { logout } from '../../features/AuthManager';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

const LogoutModal = ({ open, handleClose }) => {
    const { authState: {error}, dispatch } = useAuth(); 
    const [createAccountOpen, setUpdateAccountOpen] = useState(false);

    const handleLogout = (event) => {
        event.preventDefault();

        logout(dispatch);
        handleClose();
    }

    const handleUpdateAccount = () => {
        console.log("Open update account form/modal here");
        setUpdateAccountOpen(true); // Example toggle
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Logout/Account
                </Typography>

                <Button
                    sx={{ mt: 2, mb: 2}}
                    onClick={handleLogout}
                    variant="contained"
                    color="primary"
                    fullWidth
                >Logout</Button>
                <Divider />
                <Button
                    sx={{ 
                        mt: 2, 
                        mb: 2,
                    }}
                    onClick={handleUpdateAccount}
                    variant="outlined"
                    fullWidth
                >Manage Account</Button>
            </Box>
        </Modal>
    );
};

export default LogoutModal;
