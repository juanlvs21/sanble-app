import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useFormik } from "formik";
import { BiEnvelope } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { signInSchema } from "@/helpers/validator/auth";
import { useAuth } from "@/hooks/useAuth";
import { TAuthSigInForm } from "@/types/TAuth";
import styles from "../Auth.module.css";

export const Signin: React.FC = () => {
  const { handleSignin } = useAuth();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik<TAuthSigInForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: handleSignin,
  });
  return (
    <IonGrid
      className={`animate__animated animate__fadeIn ${styles.authScreenContainer}`}
    >
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>Ingresar</h1>
          <span className={styles.titleLineSignIn} />
          <p className={styles.subtitle}>Ingresa en la Plataforma de Sanble</p>
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
            Icon={<BiEnvelope />}
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            disabled={isSubmitting}
            value={values.email}
            helper={getErrorMessage("email", touched, errors)}
            helperIsError
          />
          <InputPassword
            name="password"
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            disabled={isSubmitting}
            value={values.password}
            helper={getErrorMessage("password", touched, errors)}
            helperIsError
          />
          <Button
            expand="block"
            color="primary"
            type="submit"
            isLoading={isSubmitting}
          >
            Ingresar
          </Button>
        </form>
      </IonRow>
    </IonGrid>
  );
};
