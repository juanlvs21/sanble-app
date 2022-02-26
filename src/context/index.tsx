// Context
import { FairsProvider } from "./FairsContext";

export const AppProvider: React.FC = ({ children }) => (
  <FairsProvider>{children}</FairsProvider>
);
