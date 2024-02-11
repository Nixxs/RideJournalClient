import { useContext, useEffect, createContext, useState, useReducer } from "react";
import { layoutContext } from "../../layouts";
import GridItem from "../../components/GridItem";
import VehicleManager from "../../features/VehicleManager";
import { initialState, vehicleReducer } from "./vehicleReducer";

export const VehiclesContext = createContext();

function Vehicles() {
    const { setPageTitle } = useContext(layoutContext);
    const [ state, dispatch ] = useReducer(vehicleReducer, initialState);

    useEffect(() => {
        setPageTitle('Browse Vehicles');
    }, [setPageTitle]);

    return (
        <GridItem>
            <VehiclesContext.Provider value={{ state, dispatch}}>
                <VehicleManager />
            </VehiclesContext.Provider>
        </GridItem>
    );
}

export default Vehicles

