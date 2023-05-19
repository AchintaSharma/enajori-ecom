import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D16C70",
      contrastText: "#fff", //button text white instead of black
      // main: "#F59B00",
      // main: "#F59B00",
      // contrastText: "#F59B00",
      // contrastText: "#354B5E",
    },
    secondary: {
      main: "#354B5E",
      contrastText: "#354B5E",
    },
    color1: {
      main: "#003d29",
    },
  },

  spacing: 10,
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  fontSize: 16,
});

export default theme;
