import { Router } from "@/router/Router";

import { WelcomeView } from "@/views/auth/Welcome";
import { useApp } from "@/hooks/useApp";

export const App: React.FC = () => {
  const { showWelcome } = useApp();

  return showWelcome ? <WelcomeView /> : <Router />;
};
