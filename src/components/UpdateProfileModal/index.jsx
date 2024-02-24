import React, { useEffect, useState, useRef, useContext } from 'react';
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
import { layoutContext } from "../../layouts";

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
    const { setPageTitle } = useContext(layoutContext);
    const { authState, dispatch } = useAuth(); 
    const [imagePreview, setImagePreview] = useState(null);
    const [username, setUsername] = useState(null); 
    const [profile, setProfile] = useState(null);
    const fileInputRef = useRef(null); 

    useEffect(() => {
        if (authState.isAuthenticated && authState.user.image) {
            setImagePreview(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${authState.user.image}`);
            setUsername(authState.user.name);
            setProfile(authState.user.profile);
        }
    }, [authState]);

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const onProfileChange = (event) => {
        setProfile(event.target.value)
    }

    const handleUserProfileUpdate = async (event) => {
        event.preventDefault();

        const username = event.target.name.value;
        const profile = event.target.profile.value;
        const image = fileInputRef.current.files[0];

        let formData = new FormData();
        formData.append("name", username);
        formData.append("profile", profile);
        if (image) {
            formData.append("image", image); // Only append if an image is selected
        }

        await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/${authState.user.id}`, {
            method: "PUT",
            headers: {
                // "Content-Type": "multipart/form-data" is not required here; the browser will automatically set it along with the correct boundary
                "authorization": `${authState.token}` // our backend doesn't use bearer token it just takes the token
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            userVehiclesDispatch({ 
                type: "UPDATE_USER_PROFILE_SUCCESS", 
                payload: {name: username, profile: profile, image: data.data.image} // Assuming 'data.image' is how your backend returns the path of the uploaded image
            });

            dispatch({
                type: "UPDATE_USER_PROFILE_SUCCESS",
                payload: {name: username, profile: profile, image: data.data.image}
            });

            setPageTitle(username);
            handleClose();
        })
        .catch((error) => {
            userVehiclesDispatch({ 
                type: "UPDATE_USER_PROFILE_FAILURE", 
                payload: error.message 
            });
        });
    
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
                            value={username}
                            onChange={onUsernameChange}
                            fullWidth
                        />
                        <TextField
                            name="profile"
                            label="Profile"
                            variant="outlined"
                            margin="normal"
                            value={profile}
                            onChange={onProfileChange}
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
