import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from 'react-router-dom';
import { layoutContext } from "../../layouts";
import Box from "@mui/material/Box";
import GridItem from "../../components/GridItem";
import VehicleProfile from "../../components/VehicleProfile";
import { vehicleDetailsReducer, initialState } from "../../reducers/vehicleDetailsReducer";
import UpdateVehicleModal from "../../modals/UpdateVehicleModal";
import VehicleTimeline from "../../components/VehicleTimeline";
import EventCard from "../../features/EventManager/EventCard";

function Vehicle() {
    const [updateVehicleModalOpen, setUpdateVehicleModalOpen] = useState(false); 
    const { id } = useParams();
    const { setPageTitle } = useContext(layoutContext);
    const [vehicleDetailsState, vehicleDetailsDispatch] = useReducer(vehicleDetailsReducer, initialState);
    const [refreshData, setRefreshData] = useState(false);

    const handleRefreshData = () => {
      setRefreshData(true);
    }

    const handleCloseUpdateVehicleModal = () => {
      setUpdateVehicleModalOpen(false)
    };

    const handleOpenUpdateVehicleModal = () => {
      setUpdateVehicleModalOpen(true)
    };

    useEffect(() => {
      setRefreshData(false);

      fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles/${id}/include`)
        .then((response) => response.json())
        .then((vehicleData) => {
          switch (vehicleData.result) {
            case 200:
              vehicleDetailsDispatch({ type: "GET_VEHICLE_DETAIL_SUCCESS", payload: vehicleData.data });
              setPageTitle(`Vehicle Timeline - ${vehicleData.data.name}`); // !!!this is cuausing a double render!!!
              break;
            case 404:
              vehicleDetailsDispatch({ type: "GET_VEHICLE_DETAIL_FAILURE", payload: vehicleData.message });
              break;
            case 500:
              vehicleDetailsDispatch({ type: "GET_VEHICLE_DETAIL_FAILURE", payload: vehicleData.message });
              break;
            default:
              vehicleDetailsDispatch({ type: "GET_VEHICLE_DETAIL_FAILURE", payload: vehicleData.message });
              break;
          }
        })
        .catch((error) =>{
          vehicleDetailsDispatch({ type: "GET_VEHICLE_DETAIL_FAILURE", payload: error.message });
        });
    }, [id, refreshData]);
    
    return (
      <>
        <GridItem>
          <Box sx={{ maxWidth: "75vw" }}>
            {vehicleDetailsState.vehicleDetails === null ? (
              <p>loading...</p>
            ) : (
              <>
                <VehicleProfile 
                  vehicleData={vehicleDetailsState.vehicleDetails} 
                  openUpdateVehicleProfileModal={handleOpenUpdateVehicleModal}
                />

                <Box sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 1
                }}>
                  <Box sx={{
                    flex: "0 0 30%",
                    marginRight: 3
                  }}>
                    <VehicleTimeline />
                  </Box>
                  <Box sx={{
                    flex: "1 1 70%"
                  }}>
                    <EventCard eventId={1}/>
                  </Box>
                  
                </Box>
                

                <UpdateVehicleModal 
                  open={updateVehicleModalOpen} 
                  handleClose={handleCloseUpdateVehicleModal}
                  vehicleDetailsDispatch={vehicleDetailsDispatch} 
                  handleRefreshData={handleRefreshData}
                  existingVehicleData={vehicleDetailsState.vehicleDetails}
                />
             </>

            )}
          </Box>
        </GridItem>


      </>
    );
}

export default Vehicle