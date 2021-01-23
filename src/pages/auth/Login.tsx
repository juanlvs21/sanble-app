import React, { useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

// Layouts
import Layout from "../../layouts/Auth";

// Styles
import styles from "./Auth.module.css";

interface IUser {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
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
    <Layout>
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
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            name="password"
            value={user.password}
            type="password"
            onIonChange={handleChange}
            required
          />
        </IonItem>
        <div className={styles.container_btns}>
          <IonButton expand="block" color="primary" type="submit">
            Iniciar Sesión
          </IonButton>
          <IonButton
            expand="block"
            color="primary"
            fill="outline"
            routerLink="/auth/register"
          >
            Registrarse
          </IonButton>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
