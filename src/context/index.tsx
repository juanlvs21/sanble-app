// import {SWRConfig} from "swr"

// Context
import { AppProvider as AppContextProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";

type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const AppProvider: React.FC<ComponentProps> = ({ children }) => (
  // <SWRConfig value={{ provider: () => new Map() }}>
  <AppContextProvider>
    <AuthProvider>{children}</AuthProvider>
  </AppContextProvider>
  //</SWRConfig>
);
