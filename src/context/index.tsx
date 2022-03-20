import { QueryClient, QueryClientProvider } from "react-query";

// Context
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

export const AppProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>{children}</UserProvider>
  </QueryClientProvider>
);
