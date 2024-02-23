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
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const { authState: {user}, dispatch } = useAuth(); 
    const [createAccountOpen, setUpdateAccountOpen] = useState(false);

    const handleLogout = (event) => {
        event.preventDefault();
        logout(dispatch);
        handleClose();
    }

    const handleUpdateAccount = () => {
        setUpdateAccountOpen(true);
        handleClose();
        // TODO: at the momoment this just navigates to the profile page but it should open a modal to update the account
        navigate(`/profile/${user.id}`);
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
