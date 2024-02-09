import { useContext } from "react";
import { layoutContext } from "../../layouts";

function About() {
    const { setPageTitle } = useContext(layoutContext);
    setPageTitle('About');

    return (
        <h1>About</h1>
    );
}

export default About