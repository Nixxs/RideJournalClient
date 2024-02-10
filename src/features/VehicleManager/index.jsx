import { useContext, useEffect } from "react";
import { VehiclesContext } from "../../pages/Vehicles";

function VehicleManager() {
    const { vehicles, setVehicles } = useContext(VehiclesContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("no data from vehicles api");
            })
            .then((vehiclesData) => {
                setVehicles(vehiclesData);
            })
            .catch(error => console.error("something went wrong getting data for vehicles"));
    }, []);

    const VehicleList = () => {
        return (
            <ul>
                {vehicles.map((vehicle) => {
                    return (
                        <li key={vehicle.id}>
                            {vehicle.make} {vehicle.model}
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div>
            <h2>Vehicles</h2>
            <VehicleList />
        </div>
    )
}

export default VehicleManager;