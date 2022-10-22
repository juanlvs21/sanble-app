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
  const {
    user: userStore,
    setUser,
    getUserDataFetcher,
    handleGetSession,
  } = useAuth();

  const { data: userData, refetch: refetchUser } = useQuery(
    ["user"],
    getUserDataFetcher,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    setUser(userData || null);
  }, [userData]);

  useEffect(() => {
    handleLoadData();

    const unsubscribe = getSessionRequest(async (user) => {
      await handleGetSession(user, refetchUser);
      handleSetReady(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return readyToUse ? <>{children}</> : <Splash />;
};
