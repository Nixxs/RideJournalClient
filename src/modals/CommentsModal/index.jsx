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
        minWidth: 400,
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
              flex: 2,
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
            backgroundColor: "blue",
            flex: 1
          }}>
            <p>the right box</p>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentsModal;
