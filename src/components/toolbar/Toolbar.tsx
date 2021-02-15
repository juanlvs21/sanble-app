import React from "react";
import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";

// Styles
import styles from "./Toolbar.module.css";

// Image
import Logo from "../../assets/images/Logo_Horizontal_Light.png";

const Toolbar: React.FC = () => {
  return (
    <IonToolbar color="primary" className={styles.toolbar}>
      <IonButtons slot="start">
        <IonMenuButton autoHide={true} />
      </IonButtons>
      <IonTitle className={styles.title}>
        <img className={styles.logo} src={Logo} alt="SANBLE" />
      </IonTitle>
      <IonButtons slot="end">
        <IonButton>
          <IonIcon slot="icon-only" icon={searchOutline} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
