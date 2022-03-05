// Context
import { FairsProvider } from "./FairsContext";
import { StandsProvider } from "./StandsContext";

export const AppProvider: React.FC = ({ children }) => (
  <FairsProvider>
    <StandsProvider>{children}</StandsProvider>
  </FairsProvider>
);
