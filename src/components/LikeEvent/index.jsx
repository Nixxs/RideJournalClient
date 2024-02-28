import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useEffect, useReducer, useState } from "react";
import { likeReducer, initialState } from "../../reducers/likeReducer";
import { useAuth } from "../../features/AuthManager";
import NotificationModal from "../../modals/NotificationModal";

function LikeEvent({ eventId, likeData }) {
  const { authState } = useAuth();
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(likeReducer, initialState);

  useEffect(() => {
    // Determine if currentUser has liked the event
    if (authState.isAuthticated) {
      const userLike = likeData.find(like => like.userId === authState.user.id);

      if (userLike) {
        dispatch({
          type: "SET_LIKE_STATUS",
          payload: {
            likeId: userLike.id,
            status: true,
          },
        });
      }
    }

    dispatch({
      type: "GET_LIKES_SUCCESS",
      payload: likeData,
    });
  }, [likeData, authState]);

  const handleLike = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${authState.token}`
      },
      body: JSON.stringify({
        eventId: parseInt(event.currentTarget.dataset.eventid),
        userId: authState.user.id,
      }),
    })
      .then((response) => response.json())
      .then((createLike) => {
        switch (createLike.result) {
          case 200:
            dispatch({
              type: "CREATE_LIKE_SUCCESS",
              payload: createLike.data,
            });
            break;
          default:
            dispatch({
              type: "CREATE_LIKE_FAILURE",
              payload: createLike.message,
            });
            break;
        }
      })
      .catch((error) => {
        dispatch({ type: "CREATE_LIKE_FAILURE", payload: error.message })
      });
  };

  const handleUnlike = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/likes/${state.likedStatus.likeId}`, {
      method: "DELETE",
      headers: {
        "authorization": `${authState.token}`
      },
    })
      .then((response) => response.json())
      .then((deleteLike) => {
        switch (deleteLike.result) {
          case 200:
            dispatch({
              type: "DELETE_LIKE_SUCCESS",
              payload: deleteLike.data,
            });
            break;
          default:
            dispatch({
              type: "DELETE_LIKE_FAILURE",
              payload: deleteLike.message,
            });
            break;
        }
      })
      .catch((error) => {
        dispatch({ type: "DELETE_LIKE_FAILURE", payload: error.message })
      });
  };

  const handleOpenModal = () => setOpen(true);
  const handlecloseModal = () => setOpen(false);

  return (
    <>
      {state.likeDetails ? (
        <Tooltip title={`${state.totalLikes} likes`}>
          {state.likedStatus ? (
            <IconButton sx={{ p: 0 }} onClick={handleUnlike} data-eventid={eventId}>
              <ThumbUpAltIcon />
            </IconButton>
          ) : (
            (authState.isAuthenticated) ? (
              <IconButton sx={{ p: 0 }} onClick={handleLike} data-eventid={eventId}>
                <ThumbUpOffAltIcon />
              </IconButton>
            ) : (
              <IconButton sx={{ p: 0 }} onClick={handleOpenModal}>
                <ThumbUpOffAltIcon />
              </IconButton>
            )
          )}
        </Tooltip>
      ) : null}

      <NotificationModal 
        open={open} 
        handleClose={handlecloseModal}
        title={"Login Required"}
        message={"You must be logged in to like this. Please log in or sign up to continue."}
      />
    </>
  );
}

export default LikeEvent;
