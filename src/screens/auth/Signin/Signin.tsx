import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { useFormik } from "formik";
import { BiEnvelope } from "react-icons/bi";

import styles from "../Auth.module.css";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { signInSchema } from "@/utils/validator/auth";
import { getErrorMessage } from "@/utils/getFormikErrorMsg";
import { TAuthSigInForm } from "@/types/TAuth";

export const Signin: React.FC = () => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik<TAuthSigInForm>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
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
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Correo electrónico"
            type="email"
            name="email"
            Icon={<BiEnvelope />}
            onIonChange={handleChange}
            value={values.email}
            onIonBlur={handleBlur}
            helper={getErrorMessage("email", touched, errors)}
            helperIsError
          />
          <InputPassword
            name="password"
            onIonChange={handleChange}
            onIonBlur={handleBlur}
            value={values.password}
            helper={getErrorMessage("password", touched, errors)}
            helperIsError
          />
          <IonButton expand="block" color="primary" type="submit">
            Ingresar
          </IonButton>
        </form>
      </IonRow>
    </IonGrid>
  );
};
