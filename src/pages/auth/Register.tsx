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
import validPassword from "../../utils/validations/password";

const initialValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register: React.FC = () => {
  const history = useHistory();
  const { errors, showErrors, setShowErrors, handleRegister } = useAuth();

  const onSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    handleRegister(values)
      .then(() => {
        resetForm(initialValues);
        history.replace("/auth/welcome");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Layout compact={true}>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};

          if (!values.displayName) errors.displayName = "Nombre requerido";
          else if (values.displayName.length < 4)
            errors.displayName = "El nombre debe tener minimo 4 caracteres";

          if (!values.email) errors.email = "Correo electrónico requerido";
          else if (!validEmail(values.email))
            errors.email = "Ingrese un correo electrónico válido";

          if (!values.password) errors.password = "Contraseña requerida";
          else if (!validPassword(values.password))
            errors.password =
              "La contraseña debe contener 1 minuscula, 1 mayuscula, 1 número y 1 símbolo.";

          if (!values.confirmPassword)
            errors.confirmPassword = "Confirmar contraseña requerida";
          else if (values.password !== values.confirmPassword)
            errors.confirmPassword = "La contraseña no coincide";

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
              <IonLabel position="floating">Nombre</IonLabel>
              <IonInput
                name="displayName"
                disabled={isSubmitting}
                onIonBlur={handleBlur}
                onIonChange={handleChange}
                value={values.displayName}
              />
            </IonItem>
            <ErrorFormik
              error={errors.displayName}
              touched={touched.displayName}
            />

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

            <IonItem>
              <IonLabel position="floating">Confirmar contraseña</IonLabel>
              <InputPassword
                name="confirmPassword"
                disabled={isSubmitting}
                onIonChange={handleChange}
                onIonBlur={handleBlur}
                value={values.confirmPassword}
              />
            </IonItem>
            <ErrorFormik
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

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
                {isSubmitting ? <IonSpinner name="dots" /> : "Registrarse"}
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

export default Register;
