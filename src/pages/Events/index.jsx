import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function Events() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('Events');
    }, [setPageTitle]);

    return (
        <h1>Events</h1>
    );
}

export default Events