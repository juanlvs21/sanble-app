import React from "react";
import { Formik } from "formik";
import { IonItem, IonLabel, IonButton, IonProgressBar } from "@ionic/react";

// Styles
import styles from "./Management.module.css";

// Components
import ErrorFormik from "../../forms/ErrorFormik";
import InputPassword from "../../forms/InputPassword";

// Utils
import validPassword from "../../../utils/validations/password";

interface ContainerProps {
  onSubmit: any;
  existError: boolean;
}

const PasswordReset: React.FC<ContainerProps> = ({ onSubmit, existError }) => (
  <Formik
    initialValues={{
      password: "",
      confirmPassword: "",
    }}
    validate={(values) => {
      const errors: any = {};

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
          <IonLabel position="floating">Contraseña</IonLabel>
          <InputPassword
            name="password"
            disabled={isSubmitting || existError}
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
            disabled={isSubmitting || existError}
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
            disabled={isSubmitting || existError}
          />
          <IonButton
            expand="block"
            color="primary"
            type="submit"
            disabled={isSubmitting || existError}
          >
            {isSubmitting ? (
              <IonProgressBar type="indeterminate" color="light" />
            ) : (
              "Guardar"
            )}
          </IonButton>
        </div>
      </form>
    )}
  </Formik>
);

export default PasswordReset;
