import { EventsContext } from "../../pages/Events";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import EventCard from "./EventCard";
import InfiniteScroll from "react-infinite-scroller";
import { debounce } from 'lodash';
import Loader from "../../components/Loader";

function EventManager() {
  const { state, dispatch } = useContext(EventsContext);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadMoreEvents = () => {
    const limit = 2;
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/events?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((eventsData) => {
        switch (eventsData.result) {
          case 200:
            const newEvents = eventsData.data.filter(newEvent => 
              !state.events.some(existingEvent => existingEvent.id === newEvent.id)
            );
            if (newEvents.length < limit) {
              setHasMoreItems(false);
            }
            dispatch({ type: "GET_EVENTS_SUCCESS", payload: newEvents });
            setOffset((prevOffset) => prevOffset + limit);
            break;
          case 404:
            setHasMoreItems(false);
            dispatch({
              type: "GET_EVENTS_FAILURE",
              payload: eventsData.errors[0].msg,
            });
            break;
          case 500:
            setHasMoreItems(false);
            dispatch({
              type: "GET_EVENTS_FAILURE",
              payload: eventsData.errors[0].msg,
            });
            break;
          default:
            setHasMoreItems(false);
            dispatch({
              type: "GET_EVENTS_FAILURE",
              payload: eventsData.errors[0].msg,
            });
            break;
        }
      })
      .catch((error) => {
        setHasMoreItems(false);
        dispatch({ type: "GET_EVENTS_FAILURE", payload: error.message });
      });
  };

  const debouncedLoadMoreEvents = debounce(loadMoreEvents, 500);

  return (
    <Box sx={{ paddingBottom: 2, paddingRight: 2 }}>
      {state.error && <Alert severity="error">{state.error}</Alert>}
      <InfiniteScroll
        pageStart={0}
        loadMore={debouncedLoadMoreEvents}
        hasMore={hasMoreItems}
        loader={<Loader key={`loader-${offset}`} />} 
      >
        {state.events.map((event) => (
          <Box
            key={event.id}
            sx={{
              marginBottom: 2,
              maxWidth: "75vw",
            }}
          >
            <EventCard eventId={event.id} />
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
}

export default EventManager;