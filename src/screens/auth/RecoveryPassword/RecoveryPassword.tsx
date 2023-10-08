import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiEnvelope } from "react-icons/bi";
import { Link } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { recoveryPasswordSchema } from "@/helpers/validator/auth";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useRecoveryPassword } from "@/hooks/useRecoveryPassword";
import { ERoutesName } from "@/types/TRoutes";
import { TRecoverPassword } from "@/types/TUser";
import styles from "../Auth.module.css";

export const RecoveryPassword = () => {
  useDocumentTitleApp("Recuperar contraseña");
  const formRef = useRef<HTMLFormElement>(null);
  const { handleRecoveryPassword, isLoading } = useRecoveryPassword();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TRecoverPassword>({
    defaultValues: {
      email: "",
    },
    resolver: recoveryPasswordSchema,
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
          ref={formRef}
          onSubmit={handleSubmit(handleRecoveryPassword)}
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
                disabled={isSubmitting || isLoading}
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
