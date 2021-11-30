import { createTheme, PaletteMode } from "@mui/material";

export const theme = (mode: PaletteMode = "light") =>
  createTheme({
    typography: {
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      fontFamily: 'Poppins, "Helvetica Neue", Arial, sans-serif',
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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            height: 45,
            textTransform: "capitalize",
          },
        },
        variants: [
          {
            props: { variant: "contained" },
            style: {
              color: "#fff",
            },
          },
        ],
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: 45,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(244, 247, 248, 1)",
            borderRadius: "20px !important",
          },
          notchedOutline: {
            borderColor: "#fff",
          },
        },
      },
    },
  });
