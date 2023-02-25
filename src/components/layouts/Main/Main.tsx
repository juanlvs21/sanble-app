import { IonPage } from "@ionic/react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/common/Sidebar";
import { useApp } from "@/hooks/useApp";
import styles from "./Main.module.css";

export const MainLayout = () => {
  const { isCapacitor, showSidebar, handleShowSidebar } = useApp();

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

        <Outlet />
      </main>
    </IonPage>
  );
};
