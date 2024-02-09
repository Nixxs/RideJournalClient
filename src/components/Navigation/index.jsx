import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { styled, useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { layoutContext } from "../../layouts";
import { drawerWidth } from "../../layouts";
import { NavLink } from "react-router-dom";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const pages = [
  { name: 'Vehicles', path: '/vehicles' , icon: <DirectionsCarFilledOutlinedIcon />},
  { name: 'Events', path: '/events', icon: <AutoStoriesOutlinedIcon />},
];

// TODO: This should change depending on whether user is logged in or not
const settings = [
  { name: 'Account', path: '/', icon: <AccountBoxIcon />},
  { name: 'My Vehicles', path: '/vehicles' , icon: <DirectionsCarFilledRoundedIcon />},
  { name: 'Post Event', path: '/events', icon: <AutoStoriesIcon />},
];

function Navigation() {
  const theme = useTheme();
  const { open, setOpen } = useContext(layoutContext);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 900,
            letterSpacing: ".1rem",
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
        >
          RIDE JOURNAL
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {settings.map((setting, index) => (
          <ListItem key={setting.name} disablePadding sx={{ display: "block" }}>
            <NavLink to={setting.path} style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {setting.icon}
                </ListItemIcon>
                <ListItemText primary={setting.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {pages.map((page, index) => (
          <ListItem key={page.name} disablePadding sx={{ display: "block" }}>
            <NavLink to={page.path} style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Navigation;
