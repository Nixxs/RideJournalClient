import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";
import { createContext, useEffect } from "react";
import { DrawerHeader } from "../components/Navigation";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import GridItem from "../components/GridItem";
import { useTheme } from "@emotion/react";
import Footer from "../components/Footer";

export const drawerWidth = 240;
export const layoutContext = createContext();

function Layout() {
  const [open, setOpen] = React.useState(true);
  const [pageTitle, setPageTitle] = React.useState("Home");
  const theme = useTheme();

  const Root = styled("div")(function () {
    return {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: theme.palette.background.default,
    };
  });

  const Main = styled("div")(() => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
  }));

  return (
    <Root>
      <CssBaseline />
      <layoutContext.Provider value={{ open, setOpen, pageTitle, setPageTitle }}>
        <Header />
        <Navigation />
        <Main>
          <DrawerHeader />
          <GridItem>
            <Grid item xs={12}>
              <Outlet />
            </Grid>
          </GridItem>
          <Footer></Footer>
        </Main>
      </layoutContext.Provider>
    </Root>
  );
}

export default Layout;
