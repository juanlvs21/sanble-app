import { createTheme, PaletteMode } from "@mui/material";

export const theme = (mode: PaletteMode = "light") =>
  createTheme({
    typography: {
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    palette: {
      mode,
      primary: {
        main: "#FF7315",
      },
      secondary: {
        main: "#3A3535",
      },
    },
  });
