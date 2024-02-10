import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function Profile() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('Profile');
    }, [setPageTitle]);
    

    return (
        <h1>Profile</h1>
    );
}

export default Profile