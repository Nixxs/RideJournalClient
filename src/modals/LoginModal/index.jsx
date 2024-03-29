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
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';

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

const LoginModal = ({ open, handleClose, handleOpenSignUp }) => {
    const { authState, dispatch } = useAuth(); 
    const [createAccountOpen, setCreateAccountOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setError(null);
    },[open]);

    const handleLogin = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const email = event.target.email.value;
        const password = event.target.password.value;

        login(dispatch, email, password).then((response) => {
            setIsLoading(false);
            if (response === "success") {
                handleClose();
            } else {
                setError(response);
            }   
        });
    }

    const handleCreateAccountOpen = () => {
        handleOpenSignUp();
        setCreateAccountOpen(true); 
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
                {isLoading ? (<Loader />):(<>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Login/Sign Up
                    </Typography>
                    < form onSubmit={handleLogin} >
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            autoComplete="email"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            autoComplete="current-password" 
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                            sx={{ mt: 2, mb: 2}}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >Login</Button>
                        
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
                    >Sign Up</Button>
                </>)}
            </Box>
        </Modal>
    );
};

export default LoginModal;
