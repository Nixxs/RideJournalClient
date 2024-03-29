import {
  eventDetailsReducer,
  initialState,
} from "../../reducers/eventDetailsReducer";
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
import UserAvatar from "../../components/UserAvatar";
import Tooltip from "@mui/material/Tooltip";
import LikeEvent from "../../components/LikeEvent";
import Comments from "../../components/Comments";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../features/AuthManager";
import UpdateEventModal from "../../modals/UpdateEventModal";
import Loader from "../../components/Loader";
import MediaModal from "../../modals/MediaModal";

function EventCard({ eventId }) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, dispatch] = useReducer(eventDetailsReducer, initialState);
  const { authState } = useAuth();
  const [updateEventModalOpen, setUpdateEventModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  const handleMediaModalOpen = () => {
    setMediaModalOpen(true);
  }

  const handleMediaModalClose = () => {
    setMediaModalOpen(false);
  }

  const handleRefreshData = () => {
    setRefreshData(true);
  };

  const handleOpenUpdateEventModal = () => {
    setUpdateEventModalOpen(true);
  }

  const handleCloseUpdateEventModal = () => {
    setUpdateEventModalOpen(false);
  }

  // get the event details
  useEffect(() => {
    setRefreshData(false);
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_SERVER_URL
      }/api/events/${eventId}/include`
    )
      .then((response) => response.json())
      .then((eventData) => {
        switch (eventData.result) {
          case 200:
            dispatch({
              type: "GET_EVENT_DETAIL_SUCCESS",
              payload: eventData.data,
            });
            setCurrentIndex(0);
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
  }, [eventId, refreshData]);

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

  const eventTypeIcon = (type) => {
    switch (type) {
      case "maintenance":
        return "🔧";
      case "repair":
        return "🛠️";
      case "modification":
        return "⚙️";
      case "story":
        return "📖";
      default:
        return "💢";
    }
  };

  return state.eventDetails === null ? (
    <Loader />
  ) : (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
          maxWidth: "900px",
          minWidth: 300,

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
            <Box sx={{ flexGrow: 0, marginRight: 2, marginTop: 0.7 }}>
              <UserAvatar userData={state.eventDetails.User} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="text.secondary">
                <Tooltip title={state.eventDetails.type} arrow>
                  <span>{eventTypeIcon(state.eventDetails.type)}</span>
                </Tooltip>{" "}
                {state.eventDetails.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {state.eventDetails.createdAt}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0, marginTop: 0.5 }}>
              <Typography variant="body2" color="text.secondary" align="right">
                {state.eventDetails.Vehicle.name} -{" "}
                {state.eventDetails.Vehicle.location}
                <br />
                {state.eventDetails.Vehicle.year}{" "}
                {state.eventDetails.Vehicle.make}{" "}
                {state.eventDetails.Vehicle.model}
                <br />
                {state.eventDetails.odometer} kms
              </Typography>
            </Box>
          </CardContent>
          {state.eventDetails?.Images.length > 0 && (
            <>
              <ImageList
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: 0,
                }}
                rowHeight={450}
                cols={1}
              >
                <ImageListItem 
                  key={state.eventDetails.Images[currentIndex]?.id} 
                  onClick={handleMediaModalOpen}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.7,
                    },
                  }}
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                      state.eventDetails.Images[currentIndex]?.image
                    }?w=500&h=450&fit=crop&auto=format`}
                    srcSet={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                      state.eventDetails.Images[currentIndex]?.image
                    }?w=500&h=450&fit=crop&auto=format&dpr=2 2x`}
                    alt={`${state.eventDetails.title}-${state.eventDetails.Images[currentIndex]?.id}`}
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

              <MediaModal 
                isOpen={mediaModalOpen} 
                onClose={handleMediaModalClose}
                imageURL={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${state.eventDetails.Images[currentIndex]?.image}`}
                imageTitle={`${state.eventDetails.title}-${state.eventDetails.Images[currentIndex]?.id}`}
              />
            </>
          )}
          {state.eventDetails?.Images.length > 1 && (
            <>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "55%",
                  left: 0,
                  transform: "translateY(-30%)",
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
                  top: "55%",
                  right: 0,
                  transform: "translateY(-30%)",
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
            </>
          )}
        </div>
        <CardContent
          sx={{
            width: "100%",
            paddingTop: 1,
          }}
        >
          {/* TODO: put in like and comment Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <Box>
              <LikeEvent
                eventId={state.eventDetails.id}
                likeData={state.eventDetails.Likes}
              />
            </Box>
            <Box sx={{ marginLeft: 1 }}>
              <Comments
                eventDetails={state.eventDetails}
                handleRefreshData={handleRefreshData}
                sx={{ marginLeft: "30px" }}
              />
            </Box>
          </Box>

          <Typography
            sx={{ marginTop: 1.5, marginBlock: 1 }}
            variant="body1"
            color="text.secondary"
          >
            <Link
              to={`/profile/${state.eventDetails.User.id}`}
              style={{
                textDecoration: "none",
                color: theme.palette.text.secondary,
                fontWeight: "bold",
              }}
            >
              {state.eventDetails.User.name}
            </Link>
            : {state.eventDetails.detail}
          </Typography>

          <CardActions>
            <NavLink to={`/vehicles/${state.eventDetails.Vehicle.id}`}>
              <Button sx={{ marginLeft: -1 }} size="small" variant="outlined">
                View Timeline
              </Button>
            </NavLink>

            
            {authState.isAuthenticated && (authState.user.id === state.eventDetails.User.id) && (
              <Button 
                size="small" 
                variant="outlined"
                onClick={handleOpenUpdateEventModal}
              >
                Edit Event
              </Button>
            )}
          </CardActions>
        </CardContent>
      </Card>
      
      <UpdateEventModal
        open={updateEventModalOpen}
        handleClose={handleCloseUpdateEventModal}
        eventState={state}
        eventDispatch={dispatch}
        handleRefreshData={handleRefreshData}
      />


    </>
  );
}

export default EventCard;
