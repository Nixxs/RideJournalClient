import { useContext, useEffect, useReducer } from "react";
import { useParams } from 'react-router-dom';
import { layoutContext } from "../../layouts";
import Box from "@mui/material/Box";
import { useAuth } from "../../features/AuthManager";
import GridItem from "../../components/GridItem";
import VehicleProfile from "../../components/VehicleProfile";
import { vehicleDetailsReducer, initialState } from "../../reducers/vehicleDetailsReducer";


function Vehicle() {
    const { authState } = useAuth();
    const { id } = useParams();
    const { setPageTitle } = useContext(layoutContext);
    const [vehicleDetailsState, vehicleDetailsDispatch] = useReducer(vehicleDetailsReducer, initialState);
    
    useEffect(() => {
      fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles/${id}/include`)
        .then((response) => response.json())
        .then((vehicleData) => {
          switch (vehicleData.result) {
            case 200:
              console.log(vehicleData.data);
              vehicleDetailsDispatch({ type: "GET_VEHICLE_DETAIL_SUCCESS", payload: vehicleData.data });
              setPageTitle(vehicleData.data.name); // !!!this is cuausing a double render!!!
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
    }, [id]);
    
    return (
      <GridItem>
        <Box sx={{ maxWidth: "75vw" }}>
          {vehicleDetailsState.vehicleDetails === null ? (
            <p>loading...</p>
          ) : (
            <VehicleProfile vehicleData={vehicleDetailsState.vehicleDetails} />
          )}
        </Box>
      </GridItem>
    );
}

export default Vehicle