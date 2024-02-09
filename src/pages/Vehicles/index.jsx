import { useContext } from "react";
import { layoutContext } from "../../layouts";

function Vehicles() {
    const { setPageTitle } = useContext(layoutContext);
    setPageTitle('Vehicles');

    return (
        <h1>Vehicles</h1>
    );
}

export default Vehicles