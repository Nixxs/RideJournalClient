import { useContext, useEffect, createContext, useState } from "react";
import { layoutContext } from "../../layouts";
import GridItem from "../../components/GridItem";
import VehicleManager from "../../features/VehicleManager";

export const VehiclesContext = createContext();

function Vehicles() {
    const { setPageTitle } = useContext(layoutContext);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setPageTitle('Browse Vehicles');
    }, [setPageTitle]);

    return (
        <GridItem>
            <VehiclesContext.Provider value={{ vehicles, setVehicles}}>
                <VehicleManager />
            </VehiclesContext.Provider>
        </GridItem>
    );
}

export default Vehicles

