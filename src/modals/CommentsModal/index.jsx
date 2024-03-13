import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UserAvatar from "../../components/UserAvatar";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Comment from './Comment';


const CommentsModal = ({ open, handleClose, eventDetails}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % eventDetails.Images.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + eventDetails.Images.length) % eventDetails.Images.length
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        outline: 'none',
        display: "flex",
        flexDirection: "column",
        minWidth: 800,
      }}>
        {/* header box */}
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {eventDetails.title}
          </Typography>
        </Box>
        {/* content box */}
        <Box sx={{
          display: "flex",
          flexDirection: {
            xs: 'column',
            sm: 'row' 
          },
        }}>
          <Box sx={{
              position: "relative",
              backgroundColor: "red",
              flex: 1,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
              <ImageList
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: 0,
                }}
                cols={1}
              >
                <ImageListItem 
                  key={eventDetails.Images[currentIndex]?.id} 
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                      eventDetails.Images[currentIndex]?.image
                    }`}
                    srcSet={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                      eventDetails.Images[currentIndex]?.image
                    }`}
                    alt={`${eventDetails.title}-${eventDetails.Images[currentIndex]?.id}`}
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
              {eventDetails?.Images.length > 1 && (
                <>
                    <IconButton
                      sx={{
                        display: isHovered ? 'flex' : 'none',
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        transform: "translateY(-50%)",
                        color: "white",
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                        },
                        zIndex: 1,
                      }}
                      onClick={handlePrevious}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        display: isHovered ? 'flex' : 'none',
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-30%)",
                        color: "white",
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                        },
                        zIndex: 1,
                      }}
                      onClick={handleNext}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                </>
              )}
          </Box>
          <Box sx={{
            flex: 1
          }}>
            {/* post description */}
            <Divider />
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              padding: "10px",
            
            }}>
              <Box sx={{m: "5px"}}>
                <UserAvatar userData={eventDetails.User} size={30} />
              </Box>
              <Box>
                <Typography variant="body1" component="p" sx={{
                  fontSize: "0.9rem",
                }}>
                  <b>{eventDetails.User.name}: </b>
                  {eventDetails.detail}
                </Typography>
              </Box>
            </Box>
            <Divider />
            {/* comments */}
            <Box sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "5px",
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "rgba(0, 0, 0, 0.05)", //placeholder colour
            }}>
              {eventDetails.Comments.map((comment) => (
                <Box key={comment.id} sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                }}>
                  <Comment comment={comment} />
                </Box>
              ))}
            </Box>
            {/* create comment */}
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              padding: "10px",
              alignItems: "center",
            }}>
              <UserAvatar userData={eventDetails.User} size={30} />
              <TextField
                id="new-comment"
                type="text"
                variant="outlined"
                fullWidth
                required
                inputProps={{ style: { fontSize: 14 } }} // changes font size inside the input
                InputLabelProps={{ style: { fontSize: 14 } }} // changes the label font size
                InputProps={{
                  style: {
                    height: 40, // adjust the height as needed
                    paddingTop: '5px', // Adjust padding to center vertically
                    paddingBottom: '5px', // Adju
                  },
                }}
              />
              <Button variant="contained">Post</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentsModal;
