import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function MyVehicles() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('My Vehicles');
    }, [setPageTitle]);
    

    return (
        <h1>MyVehicles</h1>
    );
}

export default MyVehicles