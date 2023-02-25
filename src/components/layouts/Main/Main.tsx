import { IonPage } from "@ionic/react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/common/Sidebar";
import { TopBarMain } from "@/components/modules/main/TopBarMain";
import { useApp } from "@/hooks/useApp";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import styles from "./Main.module.css";

export const MainLayout = () => {
  const { isCapacitor, showSidebar, handleShowSidebar } = useApp();
  const { props } = useTopBarMain();

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

        {props && <TopBarMain />}

        <Outlet />
      </main>
    </IonPage>
  );
};
