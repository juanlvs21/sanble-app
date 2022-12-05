import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Context
import { AppProvider as AppContextProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

const queryClient = new QueryClient();

export const AppProvider: React.FC<ComponentProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
