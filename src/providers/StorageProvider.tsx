import { useEffect } from "react";

import { Splash } from "@/components/common/Splash";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useStorage } from "@/hooks/useStorage";
import { useNative } from "@/hooks/useNative";

export type ComponentProps = {
  /**
   * Component Children
   */
  children: React.ReactElement;
};

export const StorageProvider: React.FC<ComponentProps> = ({ children }) => {
  const { showSplash } = useApp();
  const { getDataStore } = useStorage();
  const { setBgStatusBar } = useNative();

  useEffect(() => {
    setBgStatusBar("#FFFFFF", "Light");
  }, []);

  useEffect(() => {
    getDataStore();
  }, []);

  return showSplash ? <Splash /> : children;
};
