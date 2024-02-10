import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function NewEvent() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('New Event');
    }, [setPageTitle]);
    

    return (
        <h1>NewEvent</h1>
    );
}

export default NewEvent