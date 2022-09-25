import { QueryClient, QueryClientProvider } from "react-query";

// Context
import { AppProvider as AppContextProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const AppProvider: React.FC<ComponentProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
