import { eventImagesReducer, initialState } from "../../pages/Events/eventImagesReducer";
import { useReducer, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { useTheme } from '@mui/material/styles';
import { NavLink } from "react-router-dom";

function Event({ eventdata }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, dispatch] = useReducer(eventImagesReducer, initialState);
  const theme = useTheme();

  // get the event images
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/images/event/${
        eventdata.id
      }`
    )
      .then((response) => response.json())
      .then((imagesData) => {
        switch (imagesData.result) {
          case 200:
            dispatch({
              type: "GET_EVENT_IMAGES_SUCCESS",
              payload: imagesData.data,
            });
            break;
          case 404:
            dispatch({
              type: "GET_EVENT_IMAGES_FAILURE",
              payload: imagesData.message,
            });
            break;
          case 500:
            dispatch({
              type: "GET_EVENT_IMAGES_FAILURE",
              payload: imagesData.message,
            });
            break;
          default:
            dispatch({
              type: "GET_EVENT_IMAGES_FAILURE",
              payload: imagesData.message,
            });
            break;
        }
      })
      .catch((error) =>
        dispatch({ type: "GET_EVENT_IMAGES_FAILURE", payload: error.message })
      );
  }, []);

  // get the event vehicle
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles/${
        eventdata.vehicleId
      }`
    )
      .then((response) => response.json())
      .then((imagesData) => {
        switch (imagesData.result) {
          case 200:
            dispatch({
              type: "GET_EVENT_VEHICLE_SUCCESS",
              payload: imagesData.data,
            });
            break;
          case 404:
            dispatch({
              type: "GET_EVENT_VEHICLE_FAILURE",
              payload: imagesData.message,
            });
            break;
          case 500:
            dispatch({
              type: "GET_EVENT_VEHICLE_FAILURE",
              payload: imagesData.message,
            });
            break;
          default:
            dispatch({
              type: "GET_EVENT_VEHICLE_FAILURE",
              payload: imagesData.message,
            });
            break;
        }
      })
      .catch((error) =>
        dispatch({ type: "GET_EVENT_VEHICLE_FAILURE", payload: error.message })
      );
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % state.images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + state.images.length) % state.images.length
    );
  };

  return (
    <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '50vh',
      maxWidth: '60vw',
      m: 2,
      // If you want the image to take full width on small screens
      '& > div': { width: '100%' },
    }}
  >
      <div style={{height: "100%", position: "relative" }}>
        <ImageList
          sx={{
            width: "100%",
            height: "100%",
            transform: "translateZ(0)",
          }}
          rowHeight={450}
          cols={1}
        >
          <ImageListItem key={state.images[currentIndex]}>
            <img
              src={`${state.images[currentIndex]}?w=500&h=450&fit=crop&auto=format`}
              srcSet={`${state.images[currentIndex]}?w=500&h=450&fit=crop&auto=format&dpr=2 2x`}
              alt={eventdata.title}
              loading="lazy"
              className="fade-in"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </ImageListItem>
        </ImageList>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
            },
          }}
          onClick={handlePrevious}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
            },
          }}
          onClick={handleNext}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <CardContent
        sx={{
          width: '100%',
          // Add any additional styling for small screens here
        }}
      >
        <Typography variant="h5" component="div">
          {eventdata.title}
        </Typography>
        {state.vehicle && (
            <Typography variant="body2" color="text.secondary">
                {state.vehicle.year} {state.vehicle.make} {state.vehicle.model}
            </Typography>
        )}
        <Typography sx={{marginTop: 1}} variant="body1" color="text.secondary">
          {eventdata.detail}
        </Typography>
        {state.vehicle && (
            <NavLink to={`/vehicles/${state.vehicle.id}`}>{state.vehicle.name}</NavLink>
        )}
      </CardContent>
    </Card>
  );
}

export default Event;
