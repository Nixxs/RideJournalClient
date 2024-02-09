import { useContext } from "react";
import { layoutContext } from "../../layouts";

function Events() {
    const { setPageTitle } = useContext(layoutContext);
    setPageTitle('Events');

    return (
        <h1>Events</h1>
    );
}

export default Events