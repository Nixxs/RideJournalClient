import { useContext, useEffect, useReducer, useState } from "react";
import { layoutContext } from "../../layouts";
import { useParams } from "react-router-dom";
import { myVehiclesReducer, initialState } from "../../reducers/myVehiclesReducer";
import GridItem from "../../components/GridItem";
import UserProfile from "../../components/UserProfile";
import UpdateProfileModal from "../../modals/UpdateProfileModal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useAuth } from "../../features/AuthManager";
import CreateVehicleModal from "../../modals/CreateVehicleModal";



function MyVehicles() {
    const { authState } = useAuth();
    const [state, dispatch] = useReducer(myVehiclesReducer, initialState);
    const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
    const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false); 
    const { setPageTitle } = useContext(layoutContext);
    const { id } = useParams();
    const [isOwner, setIsOwner] = useState(false);

    const handleCloseUpdateProfileModal = () => {
      setUpdateProfileModalOpen(false);
    };

    const handleOpenUpdateProfileModal = () => {
      setUpdateProfileModalOpen(true);
    }

    const handleOpenAddVehicleModal = () => {
      setAddVehicleModalOpen(true)
    };

    const handleCloseAddVehicleModal = () => {
      setAddVehicleModalOpen(false)
    };

    useEffect(() => {

        if (authState.isAuthenticated && authState.user.id == Number(id)) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }

        fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/${id}/vehicles`)
        .then((response) => response.json())
        .then((data) => {
          switch (data.result) {
            case 200:
              dispatch({ type: "GET_USER_VEHICLES_SUCCESS", payload: data.data });
              setPageTitle(`${data.data.name}'s Vehicles`);
              break;
            case 404:
              dispatch({ type: "GET_USER_VEHICLES_FAILURE", payload: "User not found" });
              break;
            default:
              dispatch({ type: "GET_USER_VEHICLES_FAILURE", payload: data.message });
              break;
          }
        })
        .catch((error) =>
          dispatch({ type: "GET_USER_VEHICLES_FAILURE", payload: error.message })
        );
    }, [setPageTitle, id, authState]);


    function UserVehicleList({vehicles}) {
      const [expandedProfiles, setExpandedProfiles] = useState({});
  
      // Toggle the expanded state for a specific vehicle
      const toggleProfileExpansion = (id) => {
          setExpandedProfiles((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
          }));
      };
  
      // Determine if the profile text is long enough to need an expansion button
      const isExpandable = (text) => {
          return text && text.length > 200; // Example threshold, adjust as needed
      };
  
      return (
        <Box sx={{ maxWidth: "75vw" }}>
          <Grid container spacing={3}>
            {vehicles.map((vehicle) => (
              <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                <Card sx={{ maxWidth: "50vw", m: "auto"}}>
                  <CardMedia
                    sx={{ height: 300 }}
                    image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                      vehicle.image
                    }`}
                    title={vehicle.name}
                  />
                  <CardContent sx={{ minHeight: 190, minWidth: 300 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {vehicle.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.location}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        maxHeight: expandedProfiles[vehicle.id] ? "none" : 10,
                        minHeight: isExpandable(vehicle.profile) ? 80: 110,
                        overflow: "hidden",
                        marginTop: 1
                      }}
                    >
                      {vehicle.profile}
                    </Typography>
                    {isExpandable(vehicle.profile) && (
                      <Button
                        size="small"
                        onClick={() => toggleProfileExpansion(vehicle.id)}
                        sx={{ marginLeft: -0.5 }}
                      >
                        {expandedProfiles[vehicle.id] ? "Show Less" : "Show More"}
                      </Button>
                    )}
                  </CardContent>
                  <CardActions>
                    <NavLink to={`/vehicles/${vehicle.id}`}>
                      <Button sx={{marginLeft: 1, marginTop: -2}} size="small" variant="outlined">View Timeline</Button>
                    </NavLink>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            { isOwner &&
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 300, backgroundColor: '#f0f0f0'}}>
                    <CardContent>
                        <IconButton
                            color="primary"
                            aria-label="add vehicle"
                            onClick={handleOpenAddVehicleModal}
                            sx={{ fontSize: '3rem' }}
                        >
                            <AddCircleOutlineIcon sx={{ fontSize: '5rem' }} />
                        </IconButton>
                    </CardContent>
                </Card>
              </Grid>
            }
          </Grid>
        </Box>
      );
    };

    return (
      <>
          {(state.userVehicles) ? 
              (
                <>
                  <Box sx={{ maxWidth: "75vw"}}>
                    <GridItem>
                        <UserProfile 
                          userData={state.userVehicles} 
                          openUpdateUserProfileModal={handleOpenUpdateProfileModal}
                        /> 
                    </GridItem>
                    <Box
                      sx={{
                        marginTop: 3,
                        marginLeft: 1.5,
                        marginBottom: 3,
                      }}>
                        <UserVehicleList vehicles={state.userVehicles.Vehicles} />
                    </Box>
                  </Box>
                </>
              ) : (
                  <p>Loading...</p>
              )
          }

          <UpdateProfileModal 
            open={updateProfileModalOpen} 
            handleClose={handleCloseUpdateProfileModal}
            userVehiclesDispatch={dispatch}
          />

          <CreateVehicleModal 
            open={addVehicleModalOpen} 
            handleClose={handleCloseAddVehicleModal}
            userVehiclesDispatch={dispatch} 
          />
      </>
    );
}

export default MyVehicles