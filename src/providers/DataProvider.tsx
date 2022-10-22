import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { Splash } from "@/screens/Splash";
import { getSessionRequest } from "@/services";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const DataProvider: React.FC<ComponentProps> = ({ children }) => {
  const { readyToUse, handleSetReady, handleLoadData } = useApp();
  const { handleGetSession } = useAuth();

  useEffect(() => {
    handleLoadData();

    const unsubscribe = getSessionRequest(async (user) => {
      await handleGetSession(user);
      handleSetReady(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return readyToUse ? <>{children}</> : <Splash />;
};
