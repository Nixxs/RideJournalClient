// LoginModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../features/AuthManager';
import { login } from '../../features/AuthManager';
import Alert from '@mui/material/Alert';
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

const LoginModal = ({ open, handleClose }) => {
    const { authState: {error}, dispatch } = useAuth(); 
    const [createAccountOpen, setCreateAccountOpen] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        login(dispatch, email, password).then((response) => {
            if (response === "success") {
                handleClose();
            } 
        });
    }

    const handleCreateAccountOpen = () => {
        console.log("Open create account form/modal here");
        setCreateAccountOpen(true); // Example toggle
        handleClose(); // You might want to close the login modal
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
                    Login/Create
                </Typography>
                < form onSubmit={handleLogin} >
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        sx={{ mt: 2, mb: 2}}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >Login</Button>
                    {error && <Alert severity="error">{error}</Alert>}
                </form>
                <Divider />
                <Button
                    sx={{ 
                        mt: 2, 
                        mb: 2,
                    }}
                    onClick={handleCreateAccountOpen}
                    variant="outlined"
                    fullWidth
                >Create Account</Button>
            </Box>
        </Modal>
    );
};

export default LoginModal;
