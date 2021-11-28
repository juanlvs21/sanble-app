import { ThemeProvider as MuiThemeProvider } from "@mui/material";

import { useAppSelector } from "@/hooks/useStore";
import { theme } from "@/theme";

export type ComponentProps = {
  /**
   * The content of the component
   */
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ComponentProps> = ({ children }) => {
  const uiMode = useAppSelector((state) => state.app.uiMode);

  return <MuiThemeProvider theme={theme(uiMode)}>{children}</MuiThemeProvider>;
};
