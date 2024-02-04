import {styled} from "@mui/material/styles";
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
}));

const Main = styled("div")(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column"
}));

function Layout() {
    return (
        <Root>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Root>
    );
}

export default Layout;