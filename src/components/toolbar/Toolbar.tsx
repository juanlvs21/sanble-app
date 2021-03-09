import React from "react";
import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";

//  Styles
import styles from "./Toolbar.module.css";

// Image
import Logo from "../../assets/images/Logo_Horizontal_Light.png";

interface ContainerProps {
  simple?: boolean;
}

const Toolbar: React.FC<ContainerProps> = ({ simple }) => {
  return (
    <IonToolbar color="primary" className={styles.toolbar}>
      {!simple ? (
        <IonButtons slot="start">
          <IonMenuButton autoHide={true} />
        </IonButtons>
      ) : (
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
      )}
      <IonTitle className={styles.title}>
        <img
          className={`${styles.logo} ${simple && styles.logo_spacing_simple}`}
          src={Logo}
          alt="SANBLE"
        />
      </IonTitle>
      {!simple && (
        <IonButtons slot="end">
          <IonButton>
            <IonIcon slot="icon-only" icon={searchOutline} />
          </IonButton>
        </IonButtons>
      )}
    </IonToolbar>
  );
};

export default Toolbar;
