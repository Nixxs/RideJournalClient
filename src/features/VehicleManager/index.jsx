import React, { useContext, useState } from "react";
import { VehiclesContext } from "../../pages/Vehicles";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import VehicleList from "../../components/VehiclesList";
import InfiniteScroll from "react-infinite-scroller";
import { debounce } from 'lodash';
import Loader from "../../components/Loader";

function VehicleManager() {
  const { state, dispatch } = useContext(VehiclesContext);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadMoreVehicles = () => {
    const limit = 3;
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((vehiclesData) => {
        switch (vehiclesData.result) {
          case 200:
            const newVehicles = vehiclesData.data.filter(newVehicle => 
              !state.vehicles.some(existingVehicle => existingVehicle.id === newVehicle.id)
            );
            if (newVehicles.length < limit) {
              setHasMoreItems(false);
            }
            dispatch({ type: "GET_VEHICLES_SUCCESS", payload: newVehicles });
            setOffset((prevOffset) => prevOffset + limit);
            break;
          case 404:
            setHasMoreItems(false);
            dispatch({
              type: "GET_VEHICLES_FAILURE",
              payload: vehiclesData.errors[0].msg,
            });
            break;
          case 500:
            setHasMoreItems(false);
            dispatch({
              type: "GET_VEHICLES_FAILURE",
              payload: vehiclesData.errors[0].msg,
            });
            break;
          default:
            setHasMoreItems(false);
            dispatch({
              type: "GET_VEHICLES_FAILURE",
              payload: vehiclesData.errors[0].msg,
            });
            break;
        }
      })
      .catch((error) => {
        setHasMoreItems(false);
        dispatch({ type: "GET_EVENTS_FAILURE", payload: error.message });
      });
  };

  const debouncedLoadMoreVehicles = debounce(loadMoreVehicles, 500);

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 2, paddingRight: 2 }}>
      {state.error && <Alert severity="error">{state.error}</Alert>}
      <InfiniteScroll
        pageStart={0}
        loadMore={debouncedLoadMoreVehicles}
        hasMore={hasMoreItems}
        loader={<Loader />}
      >
        <VehicleList vehicles={state.vehicles}/>
      </InfiniteScroll>
    </Box>
  );
}

export default VehicleManager;
