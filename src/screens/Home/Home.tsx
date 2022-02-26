import { IonButton } from "@ionic/react";
import { BiBell } from "react-icons/bi";

import styles from "./Home.module.css";
import { MainLayout } from "../../layouts/Main";

export const HomeSreen: React.FC = () => {
  const notificationsBtn = (
    <IonButton
      slot="end"
      fill="solid"
      color="light"
      className={styles.headerBtn}
    >
      <BiBell size={28} />
    </IonButton>
  );

  return (
    <MainLayout headerEnd={notificationsBtn}>
      <h1>Home</h1>
    </MainLayout>
  );
};
