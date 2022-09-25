import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useFormik } from "formik";
import { BiEnvelope, BiUser } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { signUpSchema } from "@/helpers/validator/auth";
import { useAuth } from "@/hooks/useAuth";
import { TAuthSignupForm } from "@/types/TAuth";
import styles from "../Auth.module.css";

export const Signup: React.FC = () => {
  const { handleSignup } = useAuth();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik<TAuthSignupForm>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: handleSignup,
  });

  return (
    <IonGrid
      className={`animate__animated animate__fadeIn ${styles.authScreenContainer}`}
    >
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>Crea tu Cuenta</h1>
          <span className={styles.titleLineSignUp} />
          <p className={styles.subtitle}>Únete a la Plataforma de Sanble</p>
        </IonCol>
      </IonRow>
      <IonRow className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
        >
          <Input
            placeholder="Nombre"
            name="name"
            Icon={<BiUser />}
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            disabled={isSubmitting}
            value={values.name}
            helper={getErrorMessage("name", touched, errors)}
            helperIsError
          />
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
            Unirse
          </Button>
        </form>
      </IonRow>
    </IonGrid>
  );
};
