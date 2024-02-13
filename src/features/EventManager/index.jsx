import { EventsContext } from "../../pages/Events";
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Event from "./Event";

function EventManager() {
    const { state, dispatch } = useContext(EventsContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/events`)
          .then((response) => response.json())
          .then((eventsData) => {
            switch (eventsData.result) {
              case 200:
                dispatch({ type: "GET_EVENTS_SUCCESS", payload: eventsData.data });
                break;
              case 404:
                dispatch({ type: "GET_EVENTS_FAILURE", payload: eventsData.message });
                break;
              case 500:
                dispatch({ type: "GET_EVENTS_FAILURE", payload: eventsData.message });
                break;
              default:
                dispatch({ type: "GET_EVENTS_FAILURE", payload: eventsData.message });
                break;
            }
          })
          .catch((error) =>
            dispatch({ type: "GET_EVENTS_FAILURE", payload: error.message })
          );
    },[]);

    const EventList = () => {
        return (
            <div>
                {state.events.map((event) => (
                    <Event eventdata={event}/>
                ))}
            </div>
        );
    }

    return (
        <Box sx={{ paddingTop: 2, paddingBottom: 2, paddingRight: 2 }}>
        {state.error && <Alert severity="error">{state.error}</Alert>}
            <EventList />
        </Box>
    );
}

export default EventManager