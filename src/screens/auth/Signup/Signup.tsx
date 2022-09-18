import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { BiUser, BiEnvelope } from "react-icons/bi";

import styles from "../Auth.module.css";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { Input } from "@/components/common/forms/Input";

export const Signup: React.FC = () => {
  return (
    <IonGrid
      className={`animate__animated animate__fadeIn ${styles.authScreenContainer}`}
    >
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>Crea tu Cuenta</h1>
          <span className={styles.titleLineSignUp} />
          <p className={styles.subtitle}>Únete a la Plataforma de Sanble</p>
        </IonCol>
      </IonRow>
      <IonRow className={styles.formContainer}>
        <Input placeholder="Name" Icon={<BiUser />} />
        <Input
          placeholder="Correo electrónico"
          Icon={<BiEnvelope />}
          type="email"
        />
        <InputPassword />
        <IonButton expand="block" color="primary">
          Unirse
        </IonButton>
      </IonRow>
    </IonGrid>
  );
};
