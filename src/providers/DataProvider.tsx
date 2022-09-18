import { useEffect } from "react";

import { useAppContext } from "@/context/AppContext";
import { appActions } from "@/context/actions/appActions";
import { Splash } from "@/screens/Splash";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider: React.FC<ComponentProps> = ({ children }) => {
  const [{ readyToUse }, dispatch] = useAppContext();
  const { setReadyToUse } = appActions(dispatch);

  useEffect(() => {
    setTimeout(() => {
      setReadyToUse(true);
    }, 3000);
  }, []);

  return readyToUse ? <>{children}</> : <Splash />;
};
