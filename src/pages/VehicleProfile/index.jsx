import { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { layoutContext } from "../../layouts";

function VehicleProfile() {
    const { id } = useParams();
    const { setPageTitle } = useContext(layoutContext);


    useEffect(() => {
        setPageTitle('Vehicle Profile');
    }, [setPageTitle]);
    
    return (
        <h1>VehicleProfile: {id}</h1>
    );
}

export default VehicleProfile