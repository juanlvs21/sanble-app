import { QueryClient, QueryClientProvider } from "react-query";

// Context
import { AppProvider as AppContextProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

export const AppProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <UserProvider>{children}</UserProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
