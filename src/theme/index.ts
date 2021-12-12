import { createTheme, PaletteMode } from "@mui/material";

export const color = {
  primary: "#FF7315",
  secondary: "#3A3535",
};

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
        main: color.primary,
      },
      secondary: {
        main: color.secondary,
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
      MuiInputAdornment: {
        styleOverrides: {
          positionStart: {
            color: color.primary,
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            padding: 5,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              background: color.secondary,
              color: "#fff",
              borderRadius: 20,
            },
          },
        },
      },
    },
  });
