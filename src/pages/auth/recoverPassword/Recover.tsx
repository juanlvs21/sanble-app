import React from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

// Styles
import styles from "../Auth.module.css";

// Layouts
import Layout from "../../../layouts/Auth";

// Components
import ErrorFormik from "../../../components/forms/ErrorFormik";

// Hooks
import useAuth from "../../../hooks/useAuth";

// Utils
import validEmail from "../../../utils/validations/email";

const initialValues = {
  email: "",
  password: "",
};

const RecoverPassword: React.FC = () => {
  const history = useHistory();

  const {
    errors,
    showErrors,
    setShowErrors,
    handleRecoverPassword,
  } = useAuth();

  const onSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    handleRecoverPassword(values.email)
      .then(() => {
        resetForm(initialValues);
        history.replace("/auth/recoverPassword/send");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Layout>
      <h1 className="text_center">Recuperar de Contraseña</h1>

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};

          if (!values.email) errors.email = "Correo electrónico requerido";
          else if (!validEmail(values.email))
            errors.email = "Ingrese un correo electrónico válido";

          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="floating">Correo electrónico</IonLabel>
              <IonInput
                name="email"
                disabled={isSubmitting}
                onIonBlur={handleBlur}
                onIonChange={handleChange}
                value={values.email}
              />
            </IonItem>
            <ErrorFormik error={errors.email} touched={touched.email} />

            <div className={styles.container_btns}>
              {/* Trigger submit event when pressing enter on inputs */}
              <input
                type="submit"
                style={{ display: "none" }}
                disabled={isSubmitting}
              />
              <IonButton
                expand="block"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <IonSpinner name="dots" /> : "Enviar"}
              </IonButton>
              <IonButton
                expand="block"
                color="primary"
                fill="outline"
                routerLink="/auth/login"
                disabled={isSubmitting}
              >
                Iniciar Sesión
              </IonButton>
            </div>
          </form>
        )}
      </Formik>
      <IonToast
        isOpen={showErrors}
        onDidDismiss={() => setShowErrors(false)}
        message={errors}
        duration={3000}
      />
    </Layout>
  );
};

export default RecoverPassword;
