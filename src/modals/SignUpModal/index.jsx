import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useReducer, useState } from 'react';
import { signUpReducer, initialState } from '../../reducers/signUpReducer';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../features/AuthManager';
import { login } from '../../features/AuthManager';
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

const SignUpModal = ({ open, handleClose, handleOpenNotification }) => {
    const { authState: {error}, dispatch: authDispatch } = useAuth(); 
    const [state, signUpDispatch] = useReducer(signUpReducer, initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateAccount = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const name = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        // first check if the passwords match if not just return with an error
        if (password !== event.target["confirm-password"].value) {
            signUpDispatch({ type: "SIGNUP_FAILURE", payload: "Passwords do not match" });
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        try {
            fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users`, {
                method: "POST",
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.result === 200) {
                    setIsLoading(false);
                    const userData = data.data;
                    signUpDispatch({ type: "SIGNUP_SUCCESS", payload: userData })
                    login(authDispatch, email, password);
                    handleClose();
                    handleOpenNotification();
                } else {
                    console.log(data.errors[0].msg);
                    signUpDispatch({ type: "SIGNUP_FAILURE", payload: data.errors[0].msg });
                }
            })
            .catch((error) => {
                setIsLoading(false);
                signUpDispatch({ type: "SIGNUP_FAILURE", payload: error.errors });
            });
        } catch(error) {
            setIsLoading(false);
            signUpDispatch({ type: "SIGNUP_FAILURE", payload: error.errors });
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="sign-up-modal-title"
            aria-describedby="create-account-modal-description"
        >
            <Box sx={modalStyle}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Loader />
                    </Box>
                ) : (
                    <>
                        <Typography id="sign-up-modal-title" variant="h6" component="h2">
                            Create Account
                        </Typography>
                        <form onSubmit={handleCreateAccount}>
                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="username"
                            />
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="email" 
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="new-password"
                            />
                            <TextField
                                id="confirm-password"
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="new-password"
                            />
                            {state.error && <Alert severity="error">{state.error}</Alert>}
                            <Button sx={{marginTop: 2}} type="submit" variant="contained">Create Account</Button>
                        </form>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default SignUpModal;
