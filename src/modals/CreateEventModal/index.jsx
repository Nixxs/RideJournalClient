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
import MenuItem from '@mui/material/MenuItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const CreateEventModal = ({ open, handleClose, vehicleDetailsDispatch, handleRefreshData }) => {
    const theme = useTheme();
    const { authState, dispatch } = useAuth(); 
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null); 
    const [selectedType, setSelectedType] = useState('story');

    const eventOptions = ['repair', 'modification', 'story', 'maintenance'];

    const handleEventTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    useEffect(() => {
        // Reset images when the modal is opened or closed
        if (!open) {
            setImages([]);
        }
    }, [open]);

    const handleCreateEvent = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const type = selectedType;
        const date = event.target.date.value;
        const odometer = Number(event.target.odometer.value);
        const detail = event.target.detail.value;

        const jsonData = {
            userId: authState.user.id,
            vehicleId: 3,
            title: title,
            type: type,
            date: date,
            odometer: odometer,
            detail: detail,
            published: true,
        };
        console.log(jsonData);

        await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify the content type as JSON
                "Authorization": `${authState.token}`, // Ensure proper capitalization of header names
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            vehicleDetailsDispatch({ 
                type: "ADD_EVENT_SUCCESS", 
                payload: data.data
            });
            handleRefreshData();
            handleClose();

            return data.data.id;
        })
        .then(eventId =>{
            console.log("this is the enentID we are getting", eventId);
            uploadImages(eventId);
        })
        .catch((error) => {
            vehicleDetailsDispatch({ 
                type: "ADD_EVENT_FAILURE", 
                payload: error
            });
        });
        handleClose();
    };

    const uploadImages = async (eventId) => {
        const promises = images.map((image) => {
            const formData = new FormData();
            formData.append("image", image.file); 
            formData.append("eventId", eventId);
    
            return fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/images`, { // Adjust the URL to your actual image upload endpoint
                method: "POST",
                headers: {
                    "authorization": `${authState.token}`, // Include other headers as needed, but do NOT set `Content-Type` here
                },
                body: formData,
            })
            .then(response => response.json());
        });
    
        try {
            const results = await Promise.all(promises);
            console.log("Image upload results:", results);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    const handleImageChange = (event) => {
        const newImage = event.target.files[0];
        if (newImage) {
            const newImageUrl = URL.createObjectURL(newImage);
            setImages((prevImages) => [...prevImages, { id: Date.now(), url: newImageUrl, file: newImage}]);
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
                <Box sx={{ flex: 1, position: 'relative'}}>
                    <Button onClick={triggerFileInputClick} sx={{ marginBottom: 2 }}>Select Images</Button>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {images.length > 0 && (
                        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                            {images.map((image) => (
                                <ImageListItem key={image.id}>
                                    <img
                                        src={image.url} // Use the object URL stored in the images state
                                        alt={`image-${image.id}`}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: 2,  }}>
                    <Typography variant="h6" component="div" sx={{ mt: 0, mb: 2 }}>
                        Create Event (STILL IN DEVELOPMENT)
                    </Typography>
                    <form onSubmit={handleCreateEvent} noValidate>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    select
                                    name="type"
                                    label="Type"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={selectedType}
                                    onChange={handleEventTypeChange}
                                >
                                    {eventOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="date"
                                    type="date"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="odometer"
                                    label="Odometer"
                                    type="number"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="detail"
                                    label="Details"
                                    variant="outlined"
                                    margin="normal"
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
                            Create
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

export default CreateEventModal;
