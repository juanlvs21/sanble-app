import React from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonProgressBar,
} from "@ionic/react";

// Layouts
import Layout from "../../layouts/Auth";

// Styles
// import styles from "./Auth.module.css";

const Welcome: React.FC = () => {
  return (
    <Layout compact={true}>
      <h1>Change Foto</h1>
    </Layout>
  );
};

export default Welcome;
