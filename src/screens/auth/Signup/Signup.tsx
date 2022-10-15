import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useFormik } from "formik";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { signUpSchema } from "@/helpers/validator/auth";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { TAuthSignupForm } from "@/types/TAuth";
import styles from "../Auth.module.css";

export const Signup: React.FC = () => {
  useDocumentTitle("Registrarse");
  const { handleSignup, handleSigninGoogle, loadingGoogle } = useAuth();
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
            disabled={isSubmitting || loadingGoogle}
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
            disabled={isSubmitting || loadingGoogle}
            value={values.email}
            helper={getErrorMessage("email", touched, errors)}
            helperIsError
          />
          <InputPassword
            name="password"
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            disabled={isSubmitting || loadingGoogle}
            value={values.password}
            helper={getErrorMessage("password", touched, errors)}
            helperIsError
          />
          <Button
            expand="block"
            color="primary"
            type="submit"
            isLoading={isSubmitting || loadingGoogle}
            className={styles.btn}
          >
            Unirse
          </Button>
        </form>
        <Button
          expand="block"
          color="secondary"
          fill="clear"
          isLoading={isSubmitting || loadingGoogle}
          className={styles.btn}
          onClick={handleSigninGoogle}
        >
          <>
            <FcGoogle size={20} className={styles.iconGoole} />
            Unirse con Google
          </>
        </Button>
      </IonRow>
    </IonGrid>
  );
};
