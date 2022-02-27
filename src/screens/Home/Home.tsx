import { IonButton, IonSearchbar } from "@ionic/react";
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
      <IonSearchbar
        placeholder="Buscar Ferias, Stands, etc..."
        className={styles.searchbar}
      />

      <h3 className={styles.title}>Próximas Ferias</h3>
      <Carousel />

      <h3 className={styles.title}>Mejores Stands</h3>
      <Carousel />

      <h3 className={styles.title}>Productos</h3>
      <Carousel />

      <h3 className={styles.title}>Promociones</h3>
      <Carousel />
    </MainLayout>
  );
};
