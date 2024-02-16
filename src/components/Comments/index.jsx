import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useReducer, useContext } from "react";
import { commentReducer, initialState } from "../../reducers/commentReducer";
import { layoutContext } from "../../layouts";

function Comments({ eventId, commentData }) {
  const { currentUser } = useContext(layoutContext);
  const [state, dispatch] = useReducer(commentReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "GET_COMMENTS_SUCCESS",
      payload: commentData,
    });
  }, [commentData]);

  const handleClick = (event) => {
    console.log("handle the comments button click");
  };

  return state.comments ? (
    <Tooltip title={`${state.comments.length} comments`}>
      <IconButton sx={{ p: 0 }} onClick={handleClick}>
        <ChatBubbleOutlineIcon />
      </IconButton>
    </Tooltip>
  ) : null;
}

export default Comments;
