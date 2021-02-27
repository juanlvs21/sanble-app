import React from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonProgressBar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik } from "formik";

// Styles
import styles from "./Auth.module.css";

// Layouts
import Layout from "../../layouts/Auth";

// Components
import ErrorFormik from "../../components/forms/ErrorFormik";
import InputPassword from "../../components/forms/InputPassword";

// Hooks
import useAuth from "../../hooks/useAuth";

// Utils
import validEmail from "../../utils/validations/email";

const initialValues = { email: "", password: "" };

const Login: React.FC = () => {
  const history = useHistory();

  const { errors, showErrors, setShowErrors, handleLogin } = useAuth();

  const onSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    handleLogin(values.email, values.password)
      .then(() => {
        resetForm(initialValues);
        history.replace("/home");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};

          if (!values.email) errors.email = "Correo electrónico requerido";
          else if (!validEmail(values.email))
            errors.email = "Ingrese un correo electrónico válido";

          if (!values.password) errors.password = "Contraseña requerida";

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

            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <InputPassword
                name="password"
                disabled={isSubmitting}
                onIonChange={handleChange}
                onIonBlur={handleBlur}
                value={values.password}
              />
            </IonItem>
            <ErrorFormik error={errors.password} touched={touched.password} />

            <div className={styles.forgotten_password}>
              <Link to="/auth/recoverPassword">
                ¿Has olvidado tu contraseña?
              </Link>
            </div>

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
                {isSubmitting ? (
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
                disabled={isSubmitting}
              >
                Registrarse
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

export default Login;
