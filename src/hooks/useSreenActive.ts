import { useRouteMatch } from "react-router-dom";

export const useSreenActive = (screen: string) => {
  const match = useRouteMatch({ path: screen, exact: true });

  return !!match;
};
