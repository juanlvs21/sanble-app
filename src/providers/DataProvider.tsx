import { useEffect } from "react";

import { useAppContext } from "@/context/AppContext";
import { appActions } from "@/context/actions/appActions";

export type ComponentProps = {
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider: React.FC<ComponentProps> = ({ children }) => {
  const [{ readyToUse }, dispatch] = useAppContext();
  const { setReadyToUse } = appActions(dispatch);

  useEffect(() => {
    setTimeout(() => {
      setReadyToUse(true);
    }, 1000);
  }, []);

  return readyToUse ? <>{children}</> : <h1>Cargando...</h1>;
};
