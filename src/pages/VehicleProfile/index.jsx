import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function VehicleProfile() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('Vehicle Profile');
    }, [setPageTitle]);
    
    return (
        <h1>VehicleProfile</h1>
    );
}

export default VehicleProfile