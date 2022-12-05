import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Sidebar } from "@/components/common/Sidebar";
import { useApp } from "@/hooks/useApp";
import styles from "./Main.module.css";

export type ComponentProps = {
  /**
   * CSS transition className
   *
   * @default ""
   */
  transitionStage?: string;
  /**
   * Function to set transitionStage
   */
  onAnimationEnd?: () => void;
};

export const MainLayout: React.FC<ComponentProps> = ({
  transitionStage = "",
  onAnimationEnd,
}) => {
  const location = useLocation();
  const { showSidebar, handleShowSidebar, handleSetScrollTop } = useApp();

  useEffect(() => {
    handleSetScrollTop();
    handleShowSidebar(false);
  }, [location]);

  return (
    <div
      className={`${styles.mainContent} ${
        showSidebar ? styles.showSidebar : ""
      }`}
    >
      <Sidebar />
      <main
        className={`${styles.mainContainer} ${
          showSidebar ? styles.showSidebar : ""
        } ${transitionStage}`}
        onAnimationEnd={onAnimationEnd}
      >
        <div
          className={`${styles.mainOverlay} ${
            showSidebar ? styles.showSidebar : ""
          }`}
          onClick={() => handleShowSidebar(false)}
        />
        <Outlet />
      </main>
    </div>
  );
};
