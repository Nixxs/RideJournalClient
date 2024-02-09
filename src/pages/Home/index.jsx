import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function Home() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('Home');
    }, [setPageTitle]);

    return (
        <h1>HOME</h1>
    );
}

export default Home