import { getItem, setItem } from "./storage";
import { createTheme } from '@mui/material/styles';

const rjTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// returns true is user has set darkmode on thier browser preferences
export const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// get the initial theme to set
export const getInitialTheme = () => {
  let initialTheme = rjTheme;

  // if another theme was set in the browser storage use that
  if (getItem("theme")){
    initialTheme = getItem("theme");
  } 
  return initialTheme;
};

// util function for setting and storing a theme into browser storage
export const setTheme = (theme) => {
  setItem("theme", theme);
};
