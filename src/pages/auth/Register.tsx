import React, { FormEvent, useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

// Layouts
import Layout from "../../layouts/Auth";

// Styles
import styles from "./Auth.module.css";

interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = ({ target: { value, name } }: any) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <Layout compact={true}>
      <form onSubmit={handleSubmit}>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Usuario</IonLabel>
          <IonInput
            name="username"
            value={user.username}
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput
            name="name"
            value={user.name}
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            name="email"
            value={user.email}
            type="email"
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            name="password"
            value={user.password}
            type="password"
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Confirmar contraseña</IonLabel>
          <IonInput
            name="confirmPassword"
            value={user.confirmPassword}
            type="password"
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <div className={styles.container_btns}>
          <IonButton expand="block" color="primary" type="submit">
            Registrarse
          </IonButton>
          <IonButton
            expand="block"
            color="primary"
            fill="outline"
            routerLink="/auth/login"
          >
            Iniciar Sesión
          </IonButton>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
