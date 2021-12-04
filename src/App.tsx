import { Router } from "@/router/Router";

import { WelcomeView } from "@/views/auth/Welcome";
import { useAppSelector } from "@/hooks/useStore";

export const App: React.FC = () => {
  const showWelcome = useAppSelector(({ app }) => app.showWelcome);

  return showWelcome ? <WelcomeView /> : <Router />;
};
