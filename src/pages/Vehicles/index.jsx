import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function Vehicles() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('Vehicles');
    }, [setPageTitle]);

    return (
        <h1>Vehicles</h1>
    );
}

export default Vehicles