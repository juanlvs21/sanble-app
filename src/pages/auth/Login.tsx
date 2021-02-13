import React, { useEffect } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonProgressBar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

  const { register, handleSubmit, reset, errors: errorsForm } = useForm();

  useEffect(() => {
    setDataError(getErrorsMsg(errorsForm));
  }, [errorsForm]); // eslint-disable-line

  useIonViewWillEnter(() => {
    reset({
      email: "",
      password: "",
    });
  });

  const onSubmit = (user: any) =>
    handleLogin(user.email, user.password).then(() => history.replace("/home"));

  return (
    <Layout>
      <div className={styles.center_container}>
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

          <Link
            to="/auth/recoverPassword"
            className={styles.forgotten_password}
          >
            ¿Has olvidado tu contraseña?
          </Link>

          <div className={styles.container_btns}>
            {/* Trigger submit event when pressing enter on inputs */}
            <input type="submit" style={{ display: "none" }} />
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
      </div>
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
