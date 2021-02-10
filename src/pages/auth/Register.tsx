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
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

// Layouts
import Layout from "../../layouts/Auth";

// Styles
import styles from "./Auth.module.css";

// Hooks
import useAuth from "../../hooks/useAuth";

// Utils
import { validator, getErrorsMsg } from "../../utils/formValidator";

const Register: React.FC = () => {
  const history = useHistory();
  const {
    loading,
    errors,
    showErrors,
    setShowErrors,
    setDataError,
    handleRegister,
  } = useAuth();

  const { register, handleSubmit, reset, errors: errorsForm } = useForm();

  useIonViewWillEnter(() => {
    reset({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  });

  useEffect(() => {
    if (Object.keys(errorsForm).length > 0) {
      setDataError(getErrorsMsg(errorsForm));
    }
  }, [errorsForm]); // eslint-disable-line

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword)
      setDataError("La contraseña no coincide.");
    else handleRegister(data).then(() => history.replace("/auth/welcome"));
  };

  return (
    <Layout compact={true}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput
            name="displayName"
            disabled={loading}
            ref={
              register(
                validator("displayName", ["required", "minLength:4"])
              ) as any
            }
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            name="email"
            disabled={loading}
            ref={
              register(validator("email", ["required", "pattern:email"])) as any
            }
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            name="password"
            type="password"
            disabled={loading}
            ref={
              register(
                validator("password", [
                  "required",
                  "minLength:8",
                  "pattern:password",
                ])
              ) as any
            }
          />
        </IonItem>
        <IonItem className={styles.input}>
          <IonLabel position="floating">Confirmar contraseña</IonLabel>
          <IonInput
            name="confirmPassword"
            type="password"
            disabled={loading}
            ref={register(validator("confirmPassword", ["required"])) as any}
          />
        </IonItem>
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
              "Registrarse"
            )}
          </IonButton>
          <IonButton
            expand="block"
            color="primary"
            fill="outline"
            routerLink="/auth/login"
            disabled={loading}
          >
            Iniciar Sesión
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

export default Register;
