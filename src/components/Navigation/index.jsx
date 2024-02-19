import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import LoginIcon from '@mui/icons-material/Login';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { styled, useTheme } from "@mui/material/styles";
import { useContext, useState, useEffect } from "react";
import { layoutContext } from "../../layouts";
import { drawerWidth } from "../../layouts";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/AuthManager";
import Box from "@mui/material/Box";
import LoginModal from "../LoginModal";
import UserAvatar from "../UserAvatar";
import LogoutModal from "../LogoutModal";
import SignUpModal from "../SignUpModal";

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

const actions = [
  { name: 'My Vehicles', path: '/profile/1' , icon: <DirectionsCarFilledRoundedIcon />},
  { name: 'Post Event', path: '/newevent', icon: <AutoStoriesIcon />},
];

function Navigation() {
  const theme = useTheme();
  const {authState} = useAuth();
  const { open, setOpen } = useContext(layoutContext);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleOpenSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Drawer variant="permanent" open={open} sx={{ display: 'flex', flexDirection: 'column' }}>
      <DrawerHeader>
        <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
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
              '&:hover': {
                color: theme.palette.primary.dark, // Change this to the desired hover color
                textShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Add a text shadow on hover
              },
            }}
          >
            RIDE JOURNAL
          </Typography>
        </NavLink>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ flexGrow: 0}}>
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
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {authState.isAuthenticated && (
          <>
            {actions.map((action, index) => (
              <ListItem key={action.name} disablePadding sx={{ display: "block" }}>
                <NavLink to={action.path} style={{ color: 'inherit', textDecoration: 'none' }}>
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
                      {action.icon}
                    </ListItemIcon>
                    <ListItemText primary={action.name} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
          </>
        )}
      </List>
      <Box>
        <Divider />
          {(authState.isAuthenticated) ? (
              <ListItemButton
                onClick={handleLogoutClick}
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
                  <UserAvatar userData={authState.user} />
                </ListItemIcon>
                <ListItemText primary={authState.user.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={handleLoginClick}
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
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login/Sign Up" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            )
          }
      </Box>
    </Drawer>

    <LogoutModal open={logoutModalOpen} handleClose={handleCloseLogoutModal} />
    <LoginModal open={loginModalOpen} handleClose={handleCloseLoginModal} handleOpenSignUp={handleOpenSignUpModal} /> 
    <SignUpModal open={signUpModalOpen} handleClose={handleCloseSignUpModal} />
    </>
  );
}

export default Navigation
