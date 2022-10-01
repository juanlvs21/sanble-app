import { IonContent } from "@ionic/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

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
  const { showSidebar, handleShowSidebar } = useApp();

  useEffect(() => {
    handleShowSidebar(false);
  }, []);

  return (
    <IonContent className={styles.mainContent}>
      <div>
        <Sidebar />
        <main
          className={`${styles.mainContainer} ${
            showSidebar ? styles.showSidebar : ""
          } ${transitionStage}`}
          onAnimationEnd={onAnimationEnd}
        >
          <Outlet />
        </main>
        <div
          className={`${styles.mainOverlay} ${
            showSidebar ? styles.showSidebar : ""
          }`}
          onClick={() => handleShowSidebar(false)}
        />
      </div>
    </IonContent>
  );
};
