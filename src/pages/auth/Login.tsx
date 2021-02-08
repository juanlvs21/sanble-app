import React, { useEffect } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonProgressBar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

// Layouts
import Layout from "../../layouts/Auth";

// Styles
import styles from "./Auth.module.css";

// Hooks
import useAuth from "../../hooks/useAuth";

// Utils
import { validator, getErrorsMsg } from "../../utils/formValidator";

const Login: React.FC = () => {
  const history = useHistory();

  const {
    loading,
    errors,
    showErrors,
    setShowErrors,
    setDataError,
    handleLogin,
  } = useAuth();

  const { register, handleSubmit, errors: errorsForm } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setDataError(getErrorsMsg(errorsForm));
  }, [errorsForm]); // eslint-disable-line

  const onSubmit = (data: any) =>
    handleLogin(data).then(() => history.replace("/"));

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            name="email"
            disabled={loading}
            ref={register(validator("email", ["required"])) as any}
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            name="password"
            type="password"
            disabled={loading}
            ref={register(validator("password", ["required"])) as any}
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
            disabled={loading}
          >
            Registrarse
          </IonButton>
        </div>
      </form>
      <IonToast
        isOpen={showErrors}
        onDidDismiss={() => setShowErrors(false)}
        message={errors}
        duration={3000}
      />
    </Layout>
  );
};

export default Login;
