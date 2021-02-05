import React from "react";
import { IonButton } from "@ionic/react";

// Styles
import styles from "./NotFound.module.css";

// Images
import error from "../../assets/images/error.png";

const NotFound: React.FC = () => {
  return (
    <div className={styles.not_found}>
      <img src={error} alt="" />
      <h1>Página no encontrada</h1>

      <IonButton fill="outline" color="light" routerLink="/">
        Ir al inicio
      </IonButton>
    </div>
  );
};

export default NotFound;
