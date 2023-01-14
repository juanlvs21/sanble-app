// Context
import { AppProvider as AppContextProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const AppProvider = ({ children }: ComponentProps) => (
  <AppContextProvider>
    <AuthProvider>{children}</AuthProvider>
  </AppContextProvider>
);
