import { useContext, useEffect, createContext, useReducer} from "react";
import { layoutContext } from "../../layouts";
import GridItem from "../../components/GridItem";
import EventManager from "../../features/EventManager";
import { initialState, eventReducer } from "../../reducers/eventReducer";

export const EventsContext = createContext();

function Events() {
    const { setPageTitle } = useContext(layoutContext);
    const [ state, dispatch ] = useReducer(eventReducer, initialState);

    useEffect(() => {
        setPageTitle('Events');
    }, [setPageTitle]);

    return (
        <GridItem>
            <EventsContext.Provider value={{ state, dispatch}}>
                <EventManager />
            </EventsContext.Provider>
        </GridItem>
    );
}

export default Events