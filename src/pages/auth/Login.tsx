import React, { useState } from "react";
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
import styles from "./Auth.module.css";

// Hooks
import useAuth from "../../hooks/useAuth";

interface IUser {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
  });

  const { loading, errors, showErrors, setShowErrors, handleLogin } = useAuth();

  const handleChange = ({ target: { value, name } }: any) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(user);
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
            disabled={loading}
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
            disabled={loading}
            required
          />
        </IonItem>
        <div className={styles.container_btns}>
          <IonButton
            expand="block"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <IonProgressBar type="indeterminate" color="light" />
            ) : (
              "Iniciar Sesión"
            )}
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
      <IonToast
        isOpen={showErrors}
        onDidDismiss={() => setShowErrors(false)}
        message={errors}
        duration={5000}
      />
    </Layout>
  );
};

export default Login;
