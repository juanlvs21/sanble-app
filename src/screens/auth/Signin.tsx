import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { BiEnvelope } from "react-icons/bi";

import styles from "./Auth.module.css";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";

const Signin: React.FC = () => {
  return (
    <IonGrid
      className={`animate__animated animate__fadeIn ${styles.authScreenContainer}`}
    >
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>Ingresar</h1>
          <span className={styles.titleLineSignIn} />
          <p className={styles.subtitle}>Ingresa en la Plataforma de Sanble</p>
        </IonCol>
      </IonRow>
      <IonRow className={styles.formContainer}>
        <Input
          placeholder="Correo electrónico"
          Icon={<BiEnvelope />}
          type="email"
        />
        <InputPassword />
        <IonButton expand="block" color="primary">
          Ingresar
        </IonButton>
      </IonRow>
    </IonGrid>
  );
};

export default Signin;
