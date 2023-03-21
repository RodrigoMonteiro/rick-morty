import { createTheme} from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#faf9fa",
    },
    secondary: {
      main: "#11cb5f",
    },
    background: {
      default: "#faf9fa",
    },
    text: {
      primary: "#0c030c",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#0c030c",
    },
    secondary: {
      main: "#11cb5f",
    },
    background: {
      default: "#0c030c",
    },
    text: {
      primary: "#faf9fa",
    },
  },
});
