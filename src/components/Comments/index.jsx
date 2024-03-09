import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Tooltip from "@mui/material/Tooltip";
import { commentReducer, initialState } from "../../reducers/commentReducer";
import CommentsModal from "../../modals/CommentsModal";
import { useState } from "react";

function Comments({ eventDetails }) {
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);

  const handleClick = () => {
    setCommentsModalOpen(true);
  };

  const handleCloseCommentsModal = () => {
    setCommentsModalOpen(false);
  }

  return eventDetails.Comments ? (
    <>
      <Tooltip title={`${eventDetails.Comments.length} comments`}>
        <IconButton sx={{ p: 0 }} onClick={handleClick}>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </Tooltip>

      <CommentsModal 
        open={commentsModalOpen} 
        handleClose={handleCloseCommentsModal}
        eventDetails={eventDetails}
      />
    </>
  ) : null;
}

export default Comments;
