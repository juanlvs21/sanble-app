import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useFormik } from "formik";
import { BiEnvelope } from "react-icons/bi";
import { Link } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { recoveryPasswordSchema } from "@/helpers/validator/auth";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useRecoveryPassword } from "@/hooks/useRecoveryPassword";
import { ERoutesName } from "@/types/TRoutes";
import { TRecoverPassword } from "@/types/TUser";
import styles from "../Auth.module.css";

export const RecoveryPassword = () => {
  useDocumentTitleApp("Recuperar contraseña");
  const { handleRecoveryPassword, isLoading } = useRecoveryPassword();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik<TRecoverPassword>({
    initialValues: {
      email: "",
    },
    validationSchema: recoveryPasswordSchema,
    onSubmit: handleRecoveryPassword,
  });

  return (
    <IonGrid
      className={`animate__animated animate__fadeIn ${styles.authScreenContainer}`}
    >
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>Recuperar Contraseña</h1>
          <span className={styles.titleLineSignIn} />
          <p className={styles.subtitle}>
            ¿Has olvidado tu contraseña? Puedes recuperarla usando tu dirección
            de correo electrónico
          </p>
        </IonCol>
      </IonRow>
      <IonRow className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
        >
          <Input
            placeholder="Correo electrónico"
            type="email"
            name="email"
            inputmode="email"
            Icon={<BiEnvelope />}
            onIonInput={handleChange}
            onIonBlur={handleBlur}
            disabled={isSubmitting || isLoading}
            value={values.email}
            helper={getErrorMessage("email", touched, errors)}
            helperIsError
          />
          <Button
            expand="block"
            color="primary"
            type="submit"
            isLoading={isSubmitting || isLoading}
            className={styles.btn}
          >
            Recuperar
          </Button>
        </form>

        <Link
          to={ERoutesName.SESSION_SIGNIN}
          className={`${styles.recoveryPasswordToSignin}`}
        >
          Ir al inicio de sesión
        </Link>
      </IonRow>
    </IonGrid>
  );
};
