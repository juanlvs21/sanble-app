import { IonPage } from "@ionic/react";
import { useEffect } from "react";

import { Sidebar } from "@/components/common/Sidebar";
import { useApp } from "@/hooks/useApp";
import styles from "./Main.module.css";

export type ComponentProps = {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[];
};

export const MainLayout = ({ children }: ComponentProps) => {
  const { isCapacitor, showSidebar, handleShowSidebar } = useApp();

  useEffect(() => {
    console.log("Main Layout");
  }, []);

  return (
    <IonPage
      className={`${styles.mainContent} ${
        showSidebar ? styles.showSidebar : ""
      }`}
    >
      <Sidebar />
      <main
        className={`${styles.mainContainer} ${
          showSidebar ? styles.showSidebar : ""
        } ${isCapacitor ? styles.isCapacitor : ""} `}
      >
        <div
          className={`${styles.mainOverlay} ${
            showSidebar ? styles.showSidebar : ""
          }`}
          onClick={() => handleShowSidebar(false)}
        />

        <div id="sanble-main-topbar" />

        {children}
      </main>
    </IonPage>
  );
};
