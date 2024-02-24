import React, { useContext, useEffect } from "react";
import { VehiclesContext } from "../../pages/Vehicles";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import VehicleList from "../../components/VehiclesList";

function VehicleManager() {
  const { state, dispatch } = useContext(VehiclesContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles`)
      .then((response) => response.json())
      .then((vehiclesData) => {
        switch (vehiclesData.result) {
          case 200:
            dispatch({ type: "GET_VEHICLES_SUCCESS", payload: vehiclesData.data });
            break;
          case 404:
            dispatch({ type: "GET_VEHICLES_FAILURE", payload: vehiclesData.message });
            break;
          case 500:
            dispatch({ type: "GET_VEHICLES_FAILURE", payload: vehiclesData.message });
            break;
          default:
            dispatch({ type: "GET_VEHICLES_FAILURE", payload: vehiclesData.message });
            break;
        }
      })
      .catch((error) =>
        dispatch({ type: "GET_VEHICLES_FAILURE", payload: error.message })
      );
  }, []);

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 2, paddingRight: 2 }}>
      {state.error && <Alert severity="error">{state.error}</Alert>}
      <VehicleList vehicles={state.vehicles}/>
    </Box>
  );
}

export default VehicleManager;
