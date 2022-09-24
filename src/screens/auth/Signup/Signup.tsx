import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { useFormik } from "formik";
import { BiUser, BiEnvelope } from "react-icons/bi";

import styles from "../Auth.module.css";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { Input } from "@/components/common/forms/Input";
import { signUpSchema } from "@/utils/validator/auth";
import { getErrorMessage } from "@/utils/getFormikErrorMsg";
import { TAuthSignupForm } from "@/types/TAuth";

export const Signup: React.FC = () => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik<TAuthSignupForm>({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: signUpSchema,
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
          <h1 className={styles.title}>Crea tu Cuenta</h1>
          <span className={styles.titleLineSignUp} />
          <p className={styles.subtitle}>Únete a la Plataforma de Sanble</p>
        </IonCol>
      </IonRow>
      <IonRow className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Nombre"
            name="name"
            Icon={<BiUser />}
            onIonChange={handleChange}
            onIonBlur={handleBlur}
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
            Unirse
          </IonButton>
        </form>
      </IonRow>
    </IonGrid>
  );
};
