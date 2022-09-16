import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { Outlet } from "react-router-dom";

import styles from "./Auth.module.css";
import TabBar from "@/components/modules/auth/TabBar";

const AuthLayout: React.FC = () => {
  return (
    <IonContent className={styles.layoutContainer}>
      <IonGrid className={styles.layoutGrid}>
        <IonRow>
          <IonCol className={styles.logoContainer}>
            <img
              src="/assets/images/logo-full.png"
              className={styles.logoImg}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <TabBar />
        </IonRow>
        <Outlet />
      </IonGrid>
    </IonContent>
  );
};

export default AuthLayout;
