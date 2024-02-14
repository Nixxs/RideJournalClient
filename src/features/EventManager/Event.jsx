import {
  eventDetailsReducer,
  initialState,
} from "../../pages/Events/eventDetailsReducer";
import { useReducer, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

function Event({ eventReference }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, dispatch] = useReducer(eventDetailsReducer, initialState);
  console.log()

  // get the event images
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/events/${
        eventReference.id
      }/include`
    )
      .then((response) => response.json())
      .then((eventData) => {
        switch (eventData.result) {
          case 200:
            dispatch({
              type: "GET_EVENT_DETAIL_SUCCESS",
              payload: eventData.data,
            });
            break;
          case 404:
            dispatch({
              type: "GET_EVENT_DETAIL_FAILURE",
              payload: eventData.message,
            });
            break;
          case 500:
            dispatch({
              type: "GET_EVENT_DETAIL_FAILURE",
              payload: eventData.message,
            });
            break;
          default:
            dispatch({
              type: "GET_EVENT_DETAIL_FAILURE",
              payload: eventData.message,
            });
            break;
        }
      })
      .catch((error) =>
        dispatch({ type: "GET_EVENT_DETAIL_FAILURE", payload: error.message })
      );
  }, []);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % state.eventDetails.Images.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + state.eventDetails.Images.length) %
        state.eventDetails.Images.length
    );
  };

  return (
    (state.eventDetails === null) ? ( <div>Loading...</div> ) : (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
          maxWidth: "60vw",
          minWidth: 300,
          m: 2,
          // If you want the image to take full width on small screens
          "& > div": { width: "100%" },
        }}
      >
        <div style={{ height: "100%", position: "relative" }}>
          <CardContent
            sx={{
              width: "100%",
              margin: 0,
              paddingBottom: 0,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box sx={{flexGrow: 1}}>
              <Typography variant="body2"  color="text.secondary">
                {state.eventDetails.createdAt}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {state.eventDetails.title}
              </Typography>
            </Box>
            <Box sx={{flexGrow: 0}}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Nicholas Chai" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Box>


          </CardContent>
          <ImageList
            sx={{
              width: "100%",
              height: "100%",
            }}
            rowHeight={450}
            cols={1}
          >
            <ImageListItem key={state.eventDetails.Images[currentIndex].id}>
              <img
                src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                  state.eventDetails.Images[currentIndex].image
                }?w=500&h=450&fit=crop&auto=format`}
                srcSet={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                  state.eventDetails.Images[currentIndex].image
                }?w=500&h=450&fit=crop&auto=format&dpr=2 2x`}
                alt={`${state.eventDetails.title}-${state.eventDetails.Images[currentIndex].id}`}
                loading="lazy"
                className="fade-in"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
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
            width: "100%",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {state.eventDetails.Vehicle.year} {state.eventDetails.Vehicle.make}{" "}
            {state.eventDetails.Vehicle.model}
          </Typography>

          <Typography
            sx={{ marginTop: 1 }}
            variant="body1"
            color="text.secondary"
          >
            {state.eventDetails.detail}
          </Typography>
          
          <CardActions>
            <NavLink to={`/vehicles/${state.eventDetails.Vehicle.id}`}>
              <Button sx={{marginLeft: -1}} size="small" variant="outlined">View Timeline</Button>
            </NavLink>
          </CardActions>

        </CardContent>
      </Card>
    )

  );
}

export default Event;
