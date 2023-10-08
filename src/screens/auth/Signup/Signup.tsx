import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { signUpSchema } from "@/helpers/validator/auth";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { TAuthSignupForm } from "@/types/TUser";
import styles from "../Auth.module.css";

export const Signup = () => {
  useDocumentTitleApp("Registrarse");
  const formRef = useRef<HTMLFormElement>(null);
  const { handleSignup, handleSigninGoogle } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TAuthSignupForm>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: signUpSchema,
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
          ref={formRef}
          onSubmit={handleSubmit(handleSignup)}
          onKeyUp={(e) => e.key === "Enter" && formRef.current?.requestSubmit()}
        >
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, ...field },
              fieldState: { error },
            }) => (
              <Input
                placeholder="Nombre"
                Icon={<BiUser />}
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
          <Button
            expand="block"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            className={styles.btn}
          >
            Unirse
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
            Unirse con Google
          </>
        </Button>
      </IonRow>
    </IonGrid>
  );
};
