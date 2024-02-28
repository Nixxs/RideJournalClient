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

const UpdateProfileModal = ({ open, handleClose, userVehiclesDispatch, userVehiclesState }) => {
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

            if (authState.user.profile) {
                setProfile(authState.user.profile);
            } else {
                setProfile("");
            }
        }
    }, [authState, userVehiclesState.error]);

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
                "authorization": `${authState.token}` // our backend doesn't use bearer token it just takes the token
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            switch (data.result) {
                case 200:
                    userVehiclesDispatch({ 
                        type: "UPDATE_USER_PROFILE_SUCCESS", 
                        payload: {name: username, profile: profile, image: data.data.image}
                    });
        
                    dispatch({
                        type: "UPDATE_USER_PROFILE_SUCCESS",
                        payload: {name: username, profile: profile, image: data.data.image}
                    });

                    setPageTitle(username);
                    handleClose();
                default:
                    userVehiclesDispatch({ 
                        type: "UPDATE_USER_PROFILE_FAILURE", 
                        payload: data.errors[0].msg
                    });
                    break;
            }
        })
        .catch((error) => {
            userVehiclesDispatch({ 
                type: "UPDATE_USER_PROFILE_FAILURE", 
                payload: error.message 
            });
        });
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
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '100%', sm: '90%', md: '75%' }, // Adjust width based on screen size
                maxWidth: '900px', // Ensure modal doesn't exceed this width on larger screens
                maxHeight: '600px',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                outline: 'none',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack elements vertically on small screens, horizontally on larger screens
                alignItems: 'stretch',
                overflow: 'auto' // Allow modal to be scrollable if content exceeds height
            }}>
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
                        {userVehiclesState.error && <Alert severity="error">{userVehiclesState.error}</Alert>}
                        <Button
                            sx={{ mt: 1}}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Update
                        </Button>
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
