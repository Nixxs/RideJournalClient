import { useEffect, useState, useRef } from 'react';
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
import Grid from '@mui/material/Grid';

const UpdateVehicleModal = ({ open, handleClose, vehicleDetailsDispatch, handleRefreshData, existingVehicleData }) => {
    const theme = useTheme();
    const { authState, dispatch } = useAuth(); 
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState(null); 
    const [location, setLocation] = useState(null); 
    const [year, setYear] = useState(null); 
    const [make, setMake] = useState(null);
    const [model, setModel] = useState(null);
    const [profile, setProfile] = useState(null);
    const [vehicleId, setvehicleId] = useState(null);
    const fileInputRef = useRef(null); 

    useEffect(() => {
        if (authState.isAuthenticated && authState.user.image) {
            setImagePreview(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${existingVehicleData.image}`);
            setName(existingVehicleData.name);
            setLocation(existingVehicleData.location);
            setYear(existingVehicleData.year);
            setMake(existingVehicleData.make);
            setModel(existingVehicleData.model);
            setProfile(existingVehicleData.profile);
            setvehicleId(existingVehicleData.id);
        }
    }, [authState]);

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onLocationChange = (event) => {
        setLocation(event.target.value)
    }

    const onYearChange = (event) => {
        setYear(event.target.value)
    }

    const onMakeChange = (event) => {
        setMake(event.target.value)
    }

    const onModelChange = (event) => {
        setModel(event.target.value)
    }

    const onProfileChange = (event) => {
        setProfile(event.target.value)
    }

    const handleVehicleProfileUpdate = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const location = event.target.location.value;
        const year = event.target.year.value;
        const make = event.target.make.value;
        const model = event.target.model.value;
        const profile = event.target.profile.value;
        const image = fileInputRef.current.files[0];

        let formData = new FormData();
        formData.append("userId", authState.user.id);
        formData.append("type", "car");
        formData.append("name", name);
        formData.append("location", location);
        formData.append("year", year);
        formData.append("make", make);
        formData.append("model", model);
        formData.append("profile", profile);
        if (image) {
            formData.append("image", image); // Only append if an image is selected
        }

        await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles/${vehicleId}`, {
            method: "PUT",
            headers: {
                // "Content-Type": "multipart/form-data" is not required here; the browser will automatically set it along with the correct boundary
                "authorization": `${authState.token}` 
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            vehicleDetailsDispatch({ 
                type: "UPDATE_VEHICLE_DETAIL_SUCCESS", 
                payload: data
            });
            handleRefreshData();
            handleClose();
        })
        .catch((error) => {
            vehicleDetailsDispatch({ 
                type: "UPDATE_VEHICLE_DETAIL_FAILURE", 
                payload: error
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
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: 2,  }}>
                    <Typography variant="h6" component="div" sx={{ mt: 0, mb: 2 }}>
                        Update Vehicle
                    </Typography>
                    <form onSubmit={handleVehicleProfileUpdate} noValidate>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Vehicle Name"
                                    variant="outlined"
                                    margin="normal"
                                    value={name}
                                    onChange={onNameChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="location"
                                    label="Location"
                                    variant="outlined"
                                    margin="normal"
                                    value={location}
                                    onChange={onLocationChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="year"
                                    label="Year"
                                    type="number"
                                    variant="outlined"
                                    margin="normal"
                                    value={year}
                                    onChange={onYearChange}
                                    fullWidth
                                    inputProps={{ min: 1900, max: new Date().getFullYear() }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="make"
                                    label="Make"
                                    variant="outlined"
                                    margin="normal"
                                    value={make}
                                    onChange={onMakeChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="model"
                                    label="Model"
                                    variant="outlined"
                                    margin="normal"
                                    value={model}
                                    onChange={onModelChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="profile"
                                    label="Profile"
                                    variant="outlined"
                                    margin="normal"
                                    value={profile}
                                    onChange={onProfileChange}
                                    fullWidth
                                    multiline
                                    rows={5}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            sx={{ mt: 2 }}
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
                    required={true}
                />
            </Box>
        </Modal>
    );
};

export default UpdateVehicleModal;