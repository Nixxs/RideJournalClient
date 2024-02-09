import { useContext } from "react";
import { layoutContext } from "../../layouts";

function Home() {
    const { setPageTitle } = useContext(layoutContext);
    setPageTitle('Home');

    return (
        <h1>HOME</h1>
    );
}

export default Home