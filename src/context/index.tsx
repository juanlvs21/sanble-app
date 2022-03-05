// Context
import { FairsProvider } from "@/context/FairsContext";
import { StandsProvider } from "@/context/StandsContext";

export const AppProvider: React.FC = ({ children }) => (
  <FairsProvider>
    <StandsProvider>{children}</StandsProvider>
  </FairsProvider>
);
