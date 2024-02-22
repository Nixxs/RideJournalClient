import React, { useEffect, useState, useRef } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../features/AuthManager';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: "600px",
  minHeight: "200px",
  maxHeight: "500px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'stretch', 
};

const UpdateProfileModal = ({ open, handleClose, userVehiclesDispatch }) => {
    const theme = useTheme();
    const { authState, dispatch } = useAuth(); 
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null); 

    useEffect(() => {
        if (authState.isAuthenticated && authState.user.image) {
            setImagePreview(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${authState.user.image}`);
        }
    }, [authState]);

    const handleUserProfileUpdate = (event) => {
        event.preventDefault();

        const username = event.target.name.value;
        const profile = event.target.profile.value;

        // Implementation
        console.log("handle the put request to update the user profile");
        
        userVehiclesDispatch({ type: "UPDATE_USER_PROFILE_SUCCESS", payload: {"name" : username, "profile": profile} });

        handleClose();
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => setImagePreview(e.target.result);
            fileReader.readAsDataURL(event.target.files[0]);
        }
    };

    const triggerFileInputClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box sx={{ flex: 1, position: 'relative', cursor: 'pointer' }} onClick={triggerFileInputClick}>
                    {imagePreview ? 
                        <img 
                            src={imagePreview} 
                            alt="User Image" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover'
                            }} />
                        : <div 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                backgroundColor: '#eee' 
                            }}>
                                Click to select image
                        </div>
                    }
                    <IconButton sx={{ color: theme.palette.primary.main, position: 'absolute', top: 10, right: 10, backgroundColor: 'white', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: 2 }}>
                    <Typography variant="h6" component="div" sx={{ mt: 0 }}>
                        Update Profile
                    </Typography>
                    <form onSubmit={handleUserProfileUpdate} noValidate>
                        <TextField
                            name="name"
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            name="profile"
                            label="Profile"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            multiline
                            rows={7}
                        />
                        <Button
                            sx={{ mt: 2}}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Update
                        </Button>
                        {authState.error && <Alert severity="error">{authState.error}</Alert>}
                    </form>
                </Box>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />
            </Box>
        </Modal>
    );
};

export default UpdateProfileModal;
