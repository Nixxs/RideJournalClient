import { useEffect, useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useAuth } from "../../features/AuthManager";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const UpdateVehicleModal = ({
  open,
  handleClose,
  eventState,
  eventDispatch,
  handleRefreshData,
}) => {
  const theme = useTheme();
  const { authState, dispatch } = useAuth();
  const [title, setTitle] = useState(null);
  const [detail, setDetail] = useState(null);
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [odometer, setOdometer] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(eventState.eventDetails.title);
    setDetail(eventState.eventDetails.detail);
    setType(eventState.eventDetails.type);
    setDate(eventState.eventDetails.date);
    setOdometer(eventState.eventDetails.odometer);
    setVehicleId(eventState.eventDetails.vehicleId);
  }, [eventState.eventDetails]);

  const handleOpenDeleteDialog = () => {
    setopenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setopenDeleteDialog(false);
  };

  const handleRefresh = () => {
    navigate(0);
  }

  const handleConfirmDelete = async () => {
    await fetch(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/events/${eventState.eventDetails.id}`,
      {
        method: "DELETE",
        headers: {
            "authorization": `${authState.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        switch (data.result) {
          case 200:
            eventDispatch({
              type: "DELETE_EVENT_SUCCESS",
              payload: data.data,
            });

            handleCloseDeleteDialog();
            handleClose();
            handleRefresh();
            break;
          default:
            eventDispatch({
              type: "DELETE_EVENT_FAILURE",
              payload: data.errors[0].msg,
            });
            break;
        }
      })
      .catch((error) => {
        eventDispatch({
          type: "DELETE_EVENT_FAILURE",
          payload: error.message,
        });
      });
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const onTypeChange = (event) => {
    setType(event.target.value);
  };

  const onDateChange = (event) => {
    setDate(event.target.value);
  };

  const onOdometerChange = (event) => {
    setOdometer(event.target.value);
  };

  const handleEventUpdate = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const detail = event.target.detail.value;
    const type = event.target.type.value;
    const date = event.target.date.value;
    const odometer = event.target.odometer.value;

    await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/events/${eventState.eventDetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${authState.token}`,
        },
        body: JSON.stringify({
          title: title,
          detail: detail,
          type: type,
          date: date,
          odometer: odometer,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
          switch (data.result) {
            case 200:
              eventDispatch({
                type: "UPDATE_EVENT_DETAIL_SUCCESS",
                payload: data.data,
              });
              handleClose();
              handleRefreshData();
              break;
            default:
              eventDispatch({
                type: "UPDATE_EVENT_DETAIL_FAILURE",
                payload: data.errors[0].msg,
              });
              break;
          }
        })
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "100%", sm: "90%", md: "75%" }, // Adjust width based on screen size
            maxWidth: "900px", // Ensure modal doesn't exceed this width on larger screens
            maxHeight: "600px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack elements vertically on small screens, horizontally on larger screens
            alignItems: "stretch",
            overflow: "auto", // Allow modal to be scrollable if content exceeds height
          }}
        >
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", ml: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ mt: 0, mb: 2, flex: 1 }}
              >
                Update Event
              </Typography>
              {/* checking if the user is the owner of the vehicle */}
              {authState.isAuthenticated && authState.user.id === eventState.eventDetails.userId && (
                  <Button
                    sx={{ mt: 0, mb: 2, flex: 0 }}
                    onClick={handleOpenDeleteDialog}
                    variant="outlined"
                    color="error"
                    security="delete"
                    size="small"
                    fullWidth
                  >
                    Delete
                  </Button>
                )}
            </Box>
            <form onSubmit={handleEventUpdate}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="title"
                    label="Event Title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={onTitleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="detail"
                    label="Details"
                    variant="outlined"
                    margin="normal"
                    value={detail}
                    onChange={onDetailChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="type"
                    label="Type"
                    variant="outlined"
                    margin="normal"
                    value={type}
                    onChange={onTypeChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="date"
                    label="Date"
                    variant="outlined"
                    type="date"
                    margin="normal"
                    value={date}
                    onChange={onDateChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="odometer"
                    label="Odometer"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={odometer}
                    onChange={onOdometerChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              {eventState.error && (
                <Alert severity="error">{eventState.error}</Alert>
              )}
              <Button
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateVehicleModal;
