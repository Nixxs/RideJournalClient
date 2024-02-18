import {useContext} from "react";
import { VehiclesContext } from "../../pages/Vehicles";

function VehicleFilter(){
    const { state, dispatch } = useContext(VehiclesContext);

    return (
        <div>
            <h2>Vehicle Filter</h2>
            {state.vehicles.length}
        </div>
    )
}

export default VehicleFilter;