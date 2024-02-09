import { useContext, useEffect } from "react";
import { layoutContext } from "../../layouts";

function About() {
    const { setPageTitle } = useContext(layoutContext);
    useEffect(() => {
        setPageTitle('About');
    }, [setPageTitle]);
    

    return (
        <h1>About</h1>
    );
}

export default About