import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiEnvelope } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { signInSchema } from "@/helpers/validator/auth";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { ERoutesName } from "@/types/TRoutes";
import { TAuthSigInForm } from "@/types/TUser";
import styles from "../Auth.module.css";

export const Signin = () => {
  useDocumentTitleApp("Iniciar Sesión");
  const formRef = useRef<HTMLFormElement>(null);
  const { handleSignin, handleSigninGoogle } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TAuthSigInForm>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: signInSchema,
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
          ref={formRef}
          onSubmit={handleSubmit(handleSignin)}
          onKeyUp={(e) => e.key === "Enter" && formRef.current?.requestSubmit()}
        >
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, ...field },
              fieldState: { error },
            }) => (
              <Input
                placeholder="Correo electrónico"
                type="email"
                inputmode="email"
                Icon={<BiEnvelope />}
                onIonInput={onChange}
                onIonBlur={onBlur}
                disabled={isSubmitting}
                helper={error?.message}
                helperIsError
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, ...field },
              fieldState: { error },
            }) => (
              <InputPassword
                onIonInput={onChange}
                onIonBlur={onBlur}
                disabled={isSubmitting}
                helper={error?.message}
                helperIsError
                {...field}
              />
            )}
          />

          <Link
            to={ERoutesName.SESSION_RECOVERY_PASSWORD}
            className={`${styles.recoveryPasswordToForm}`}
          >
            ¿Has olvidado tu contraseña?
          </Link>

          <Button
            expand="block"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            className={styles.btn}
          >
            Ingresar
          </Button>
        </form>
        <Button
          expand="block"
          color="secondary"
          fill="clear"
          disabled={isSubmitting}
          className={styles.btn}
          onClick={handleSigninGoogle}
        >
          <>
            <FcGoogle size={20} className={styles.iconGoole} />
            Ingresar con Google
          </>
        </Button>
      </IonRow>
    </IonGrid>
  );
};
