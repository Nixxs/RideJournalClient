import { useEffect, useState, useRef } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../features/AuthManager';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Loader from '../../components/Loader';


const CreateEventModal = ({ open, handleClose, vehicleDetailsDispatch, handleRefreshData, vehicleDetailsState, updateSelectedEventId }) => {
    const theme = useTheme();
    const { authState, dispatch } = useAuth(); 
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null); 
    const [selectedType, setSelectedType] = useState('story');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const eventOptions = ['repair', 'modification', 'story', 'maintenance'];

    const handleEventTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    useEffect(() => {
        // Reset images and errors when the modal is opened or closed
        if (!open) {
            setImages([]);
            setError(null);
        }

        // if there is an error in the vehicleDetailsState, set the errors state
        if (vehicleDetailsState.error) {
            setError(vehicleDetailsState.error);
        }
    }, [open, vehicleDetailsState.error]);

    const handleCreateEvent = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (images.length === 0) {
            setError("Please set at least 1 image for this event");
            return;
        }

        const title = event.target.title.value;
        const type = selectedType;
        const date = event.target.date.value;
        const odometer = Number(event.target.odometer.value);
        const detail = event.target.detail.value;

        const jsonData = {
            userId: authState.user.id,
            vehicleId: vehicleDetailsState.vehicleDetails.id,
            title: title,
            type: type,
            date: date,
            odometer: odometer,
            detail: detail,
            published: true,
        };

        await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify the content type as JSON
                "authorization": `${authState.token}`, // Ensure proper capitalization of header names
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(eventData => {
            switch (eventData.result) {
                case 200:
                    vehicleDetailsDispatch({ 
                        type: "ADD_EVENT_SUCCESS", 
                        payload: eventData.data
                    });
                    return eventData.data.id;
                case 404:
                    setIsLoading(false);
                    vehicleDetailsDispatch({ 
                        type: "ADD_EVENT_FAILURE", 
                        payload: eventData.errors[0].msg
                    });
                    break;
                case 422:
                    setIsLoading(false);
                    vehicleDetailsDispatch({ 
                        type: "ADD_EVENT_FAILURE", 
                        payload: eventData.errors[0].msg
                    });
                    break;
                default:
                    setIsLoading(false);
                    vehicleDetailsDispatch({ 
                        type: "ADD_EVENT_FAILURE", 
                        payload: "Unknown error"
                    });
                    break;
            }
        })
        .then(eventId =>{
            uploadImages(eventId).then(() => {
                setIsLoading(false);

                if (!error) {
                    handleRefreshData();
                    updateSelectedEventId(eventId);
                    handleClose();
                }
            })
        })
        .catch((error) => {
            vehicleDetailsDispatch({ 
                type: "ADD_EVENT_FAILURE", 
                payload: error
            });
        });
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
            .then(response => response.json())
            .then(imagePostData => {
                switch (imagePostData.result) {
                    case 200:
                        vehicleDetailsDispatch({ 
                            type: "POST_EVENT_IMAGE_SUCCESS", 
                            payload: imagePostData.data
                        });
                        break;
                    case 404:
                        vehicleDetailsDispatch({ 
                            type: "POST_EVENT_IMAGE_FAILURE", 
                            payload: imagePostData.errors[0].msg
                        });
                        break;
                    case 422:
                        vehicleDetailsDispatch({ 
                            type: "POST_EVENT_IMAGE_FAILURE", 
                            payload: imagePostData.errors[0].msg
                        });
                        break;
                    default:
                        vehicleDetailsDispatch({ 
                            type: "POST_EVENT_IMAGE_FAILURE", 
                            payload: imagePostData.errors[0].msg
                        });
                        break;
                }
            });
        });
    
        try {
            await Promise.all(promises);
        } catch (er) {
            vehicleDetailsDispatch({ 
                type: "ADD_EVENT_FAILURE", 
                payload: er
            });
        }
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newImages = Array.from(files).map(file => ({
            id: Date.now() + Math.random(), // Ensuring unique ID for each file
            url: URL.createObjectURL(file),
            file: file
        }));
    
        setImages((prevImages) => [...prevImages, ...newImages]);
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
                overflow: 'auto' 
            }}>
                {isLoading ? (
                    <Loader />
                ):(
                    <>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            flex: 1,
                            position: 'relative',
                        }}>
                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <Box sx={{
                                backgroundColor: theme.palette.grey[300],
                                borderRadius: "5px"
                            }}
                            >
                                {images.length > 0 && (
                                    <ImageList sx={{ padding: 2, maxWidth: 450, maxHeight: 355 }} cols={3} rowHeight={140}>
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
                            <Button 
                                onClick={triggerFileInputClick} 
                                sx={{ margin: 3, width: 200}}
                                variant="outlined"
                            >
                                Add Images
                            </Button>
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: 2,  }}>
                            <Typography variant="h6" component="div" sx={{ mt: 0, mb: 2 }}>
                                Create Event
                            </Typography>
                            <form onSubmit={handleCreateEvent}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            name="title"
                                            label="Title"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            required
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
                                            required
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
                                            required
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
                                            required
                                            multiline
                                            rows={5}
                                        />
                                    </Grid>
                                </Grid>
                                {error && <Alert severity="error">{error}</Alert>}
                                <Button
                                    sx={{ mt: 2 }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Create
                                </Button>
                            </form>
                        </Box>
                        <input
                            type="file"
                            multiple
                            name="image"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            required={true}
                        />
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default CreateEventModal;
