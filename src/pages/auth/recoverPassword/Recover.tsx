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
import Layout from "../../../layouts/Auth";

// Styles
import styles from "../Auth.module.css";

// Hooks
import useAuth from "../../../hooks/useAuth";

// Utils
import { validator, getErrorsMsg } from "../../../utils/formValidator";

const RecoverPassword: React.FC = () => {
  const history = useHistory();

  const {
    loading,
    errors,
    showErrors,
    setShowErrors,
    setDataError,
    handleRecoverPassword,
  } = useAuth();

  const { register, handleSubmit, reset, errors: errorsForm } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setDataError(getErrorsMsg(errorsForm));
  }, [errorsForm]); // eslint-disable-line

  useIonViewWillEnter(() => {
    reset({
      email: "",
    });
  });

  const onSubmit = (data: any) =>
    handleRecoverPassword(data.email).then(() =>
      history.replace("/auth/recoverPassword/send")
    );

  return (
    <Layout>
      <div className={styles.center_container}>
        <h1>Recuperar de Contraseña</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem className={styles.input}>
            <IonLabel position="floating">Correo electrónico</IonLabel>
            <IonInput
              name="email"
              disabled={loading}
              ref={register(validator("email", ["required"])) as any}
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
                "Enviar"
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
      </div>
    </Layout>
  );
};

export default RecoverPassword;
