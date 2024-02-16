import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useEffect, useReducer, useContext } from "react";
import { likeReducer, initialState } from "../../reducers/likeReducer";
import { layoutContext } from "../../layouts";

function LikeEvent({ eventId, likeData }) {
  const { currentUser } = useContext(layoutContext);
  const [state, dispatch] = useReducer(likeReducer, initialState);

  useEffect(() => {
    // Determine if currentUser has liked the event
    const userLike = likeData.find(like => like.userId === currentUser.id);

    if (userLike) {
      dispatch({
        type: "SET_LIKE_STATUS",
        payload: {
          likeId: userLike.id,
          status: true,
        },
      });
    }

    dispatch({
      type: "GET_LIKES_SUCCESS",
      payload: likeData,
    });
  }, [likeData, currentUser.id]);

  const handleLike = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: parseInt(event.currentTarget.dataset.eventid),
        userId: currentUser.id,
      }),
    })
      .then((response) => response.json())
      .then((createLike) => {
        switch (createLike.result) {
          case 200:
            console.log("Success:", createLike.data);
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
    const eventId = parseInt(event.currentTarget.dataset.eventid);
    console.log(`delete Like for event: ${eventId}`);
    console.log(state.likedStatus);

    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/likes/${state.likedStatus.likeId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deleteLike) => {
        switch (deleteLike.result) {
          case 200:
            console.log("Success:", deleteLike.data);
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

  return state.likeDetails ? (
    <Tooltip title={`${state.totalLikes} likes`}>
      {state.likedStatus ? (
        <IconButton sx={{ p: 0 }} onClick={handleUnlike} data-eventid={eventId}>
          <ThumbUpAltIcon />
        </IconButton>
      ) : (
        <IconButton sx={{ p: 0 }} onClick={handleLike} data-eventid={eventId}>
          <ThumbUpOffAltIcon />
        </IconButton>
      )}
    </Tooltip>
  ) : null;
}

export default LikeEvent;
