import { useEffect } from "react";

import { Splash } from "@/components/common/Splash";
import { useAppSelector } from "@/hooks/useStore";
import { useStorage } from "@/hooks/useStorage";

export type ComponentProps = {
  /**
   * Component Children
   */
  children: React.ReactElement;
};

export const StorageProvider: React.FC<ComponentProps> = ({ children }) => {
  const showSplash = useAppSelector(({ app }) => app.showSplash);
  const { getDataStore } = useStorage();

  useEffect(() => {
    getDataStore();
  }, []);

  return showSplash ? <Splash /> : children;
};
