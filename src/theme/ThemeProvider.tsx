import { ThemeProvider as MuiThemeProvider } from "@mui/material";

import { useApp } from "@/hooks/useApp";
import { theme } from "@/theme";

export type ComponentProps = {
  /**
   * The content of the component
   */
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ComponentProps> = ({ children }) => {
  const { uiMode } = useApp();

  return <MuiThemeProvider theme={theme(uiMode)}>{children}</MuiThemeProvider>;
};
