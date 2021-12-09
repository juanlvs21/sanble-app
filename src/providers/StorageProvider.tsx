import { useEffect } from "react";

import { Splash } from "@/components/common/Splash";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useStorage } from "@/hooks/useStorage";

export type ComponentProps = {
  /**
   * Component Children
   */
  children: React.ReactElement;
};

export const StorageProvider: React.FC<ComponentProps> = ({ children }) => {
  const { showSplash } = useApp();
  const { gettingSession } = useAuth();
  const { getDataStore } = useStorage();

  useEffect(() => {
    getDataStore();
  }, []);

  return showSplash || gettingSession ? <Splash /> : children;
};
