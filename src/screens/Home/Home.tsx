import { IonButton } from "@ionic/react";
import { BiBell } from "react-icons/bi";

import styles from "./Home.module.css";
import { MainLayout } from "../../layouts/Main";
import { Carousel } from "../../components/common/Carousel";

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
      <Carousel />
    </MainLayout>
  );
};
