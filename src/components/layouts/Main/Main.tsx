import { IonContent } from "@ionic/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Sidebar } from "@/components/common/Sidebar";
import { useApp } from "@/hooks/useApp";
import styles from "./Main.module.css";

type ComponentProps = {
  /**
   * CSS transition className
   */
  transitionStage: string;
  /**
   * Function to set transitionStage
   */
  onAnimationEnd: () => void;
};

export const MainLayout: React.FC<ComponentProps> = ({
  onAnimationEnd,
  transitionStage,
}) => {
  const location = useLocation();
  const { showSidebar, handleShowSidebar } = useApp();

  useEffect(() => {
    handleShowSidebar(false);
  }, [location]);

  return (
    <IonContent
      className={`${styles.mainContent} ${
        showSidebar ? styles.showSidebar : ""
      }`}
    >
      <div>
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
    </IonContent>
  );
};
