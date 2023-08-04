import { IonAvatar, IonCol, IonGrid, IonRow } from "@ionic/react";
import { BiEnvelope, BiPhone, BiUser } from "react-icons/bi";
import { useFormik } from "formik";

import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Input } from "@/components/common/forms/Input";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";
import styles from "./Profile.module.css";
import { Button } from "@/components/common/buttons/Button";
import { TChangePassword, TUpdateUser } from "@/types/TUser";
import { userSchema } from "@/helpers/validator/user";
import parsePhoneNumberFromString from "libphonenumber-js";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { changePasswordSchema } from "@/helpers/validator/auth";

export const Profile = () => {
  const { user } = useUser();
  const title = user?.displayName || user?.email || "Mi Perfil";
  useDocumentTitleApp(`${title} 👤`);

  const { handleUpdateUser, handleChangePasswordUser } = useUser();
  const {
    handleSubmit: handleSubmitUpdate,
    handleChange: handleChangeUpdate,
    handleBlur: handleBlurUpdate,
    values: valuesUpdate,
    touched: touchedUpdate,
    errors: errorsUpdate,
    isSubmitting: isSubmittingUpdate,
  } = useFormik<TUpdateUser>({
    initialValues: {
      displayName: user?.displayName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    },
    validationSchema: userSchema,
    onSubmit: handleUpdateUser,
    enableReinitialize: true,
  });

  const {
    handleSubmit: handleSubmitChangePass,
    handleChange: handleChangeChangePass,
    handleBlur: handleBlurChangePass,
    values: valuesChangePass,
    touched: touchedChangePass,
    errors: errorsChangePass,
    isSubmitting: isSubmittingChangePass,
  } = useFormik<TChangePassword>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: handleChangePasswordUser,
    enableReinitialize: true,
  });

  return (
    <Fetcher classNameSection="animate__animated animate__screenInUp">
      <IonGrid className={`${styles.profileGrid}`}>
        <IonRow>
          <IonCol size="12"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol
            size="12"
            size-md="5"
            className={`${styles.profileCol} ${styles.colRight}`}
          >
            <IonAvatar className={`${styles.profileAvatar}`}>
              <ImageExtended
                src={user?.photoURL}
                alt={title}
                className={`${styles.profileAvatar}`}
              />
            </IonAvatar>
          </IonCol>
          <IonCol
            size="12"
            size-md="7"
            className={`${styles.profileCol} ${styles.colLeft}`}
          >
            <form
              onSubmit={handleSubmitUpdate}
              onKeyUp={(e) => e.key === "Enter" && handleSubmitUpdate()}
              className={`${styles.profileForm}`}
            >
              <h2 className={`${styles.profileTitle}`}>Datos del Usuario</h2>

              <Input
                placeholder="Nombre"
                type="text"
                name="displayName"
                Icon={<BiUser />}
                onIonInput={handleChangeUpdate}
                onIonBlur={handleBlurUpdate}
                disabled={isSubmittingUpdate}
                value={valuesUpdate.displayName}
                helper={getErrorMessage("email", touchedUpdate, errorsUpdate)}
                helperIsError
              />

              <Input
                placeholder="Correo electrónico"
                type="email"
                name="email"
                inputmode="email"
                Icon={<BiEnvelope />}
                onIonInput={handleChangeUpdate}
                onIonBlur={handleBlurUpdate}
                disabled={isSubmittingUpdate}
                value={valuesUpdate.email}
                helper={getErrorMessage("email", touchedUpdate, errorsUpdate)}
                helperIsError
              />

              <Input
                placeholder="Teléfono"
                name="phoneNumber"
                type="tel"
                inputmode="tel"
                Icon={<BiPhone />}
                onIonInput={handleChangeUpdate}
                onIonBlur={handleBlurUpdate}
                label="+58"
                value={(
                  parsePhoneNumberFromString(valuesUpdate.phoneNumber, "VE")
                    ?.nationalNumber || valuesUpdate.phoneNumber
                ).slice(0, 10)}
                helper={getErrorMessage(
                  "phoneNumber",
                  touchedUpdate,
                  errorsUpdate
                )}
                helperIsError
              />

              <Button
                expand="block"
                color="primary"
                type="submit"
                isLoading={isSubmittingUpdate}
              >
                Guardar
              </Button>
            </form>

            <span className={`${styles.divider}`} />

            <form
              onSubmit={handleSubmitChangePass}
              onKeyUp={(e) => e.key === "Enter" && handleSubmitChangePass()}
              className={`${styles.profileForm}`}
            >
              <h2 className={`${styles.profileTitle}`}>Cambiar Contraseña</h2>

              <InputPassword
                placeholder="Contraseña"
                name="password"
                onIonInput={handleChangeChangePass}
                onIonBlur={handleBlurChangePass}
                disabled={isSubmittingChangePass}
                value={valuesChangePass.password}
                helper={getErrorMessage(
                  "password",
                  touchedChangePass,
                  errorsChangePass
                )}
                helperIsError
              />

              <InputPassword
                placeholder="Confirmar Contraseña"
                name="confirmPassword"
                onIonInput={handleChangeChangePass}
                onIonBlur={handleBlurChangePass}
                disabled={isSubmittingChangePass}
                value={valuesChangePass.confirmPassword}
                helper={getErrorMessage(
                  "confirmPassword",
                  touchedChangePass,
                  errorsChangePass
                )}
                helperIsError
              />

              <Button
                expand="block"
                color="primary"
                type="submit"
                isLoading={isSubmittingChangePass}
              >
                Cambiar Contraseña
              </Button>
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Fetcher>
  );
};
