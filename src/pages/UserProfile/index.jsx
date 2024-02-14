import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";
import { useParams } from "react-router-dom";

function UserProfile() {
    const { setPageTitle } = useContext(layoutContext);
    const { id } = useParams();

    useEffect(() => {
        setPageTitle('My Vehicles');
    }, [setPageTitle]);

    return (
        <h1>UserProfile: {id}</h1>
    );
}

export default UserProfile