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
import { TUpdateUser } from "@/types/TUser";
import { userSchema } from "@/helpers/validator/user";
import parsePhoneNumberFromString from "libphonenumber-js";
import { getErrorMessage } from "@/helpers/getFormikErrorMsg";

export const Profile = () => {
  const { user } = useUser();
  const title = user?.displayName || user?.email || "Mi Perfil";
  useDocumentTitleApp(`${title} 👤`);

  const { handleUpdateUser } = useUser();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
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

  return (
    <Fetcher
      // handleRefresh={handleRefresh}
      // handleInfiniteScroll={handleInfinite}
      classNameSection="animate__animated animate__screenInUp"
      // isLoading={isLoading || isLoading}
    >
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
              onSubmit={handleSubmit}
              onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
              className={`${styles.profileForm}`}
            >
              <h2 className={`${styles.profileTitle}`}>Datos del Usuario</h2>

              <Input
                placeholder="Nombre"
                type="text"
                name="displayName"
                Icon={<BiUser />}
                onIonInput={handleChange}
                onIonBlur={handleBlur}
                disabled={isSubmitting}
                value={values.displayName}
                helper={getErrorMessage("email", touched, errors)}
                helperIsError
              />

              <Input
                placeholder="Correo electrónico"
                type="email"
                name="email"
                inputmode="email"
                Icon={<BiEnvelope />}
                onIonInput={handleChange}
                onIonBlur={handleBlur}
                disabled={isSubmitting}
                value={values.email}
                helper={getErrorMessage("email", touched, errors)}
                helperIsError
              />

              <Input
                placeholder="Teléfono"
                name="phoneNumber"
                type="tel"
                inputmode="tel"
                Icon={<BiPhone />}
                onIonInput={handleChange}
                onIonBlur={handleBlur}
                label="+58"
                value={(
                  parsePhoneNumberFromString(values.phoneNumber, "VE")
                    ?.nationalNumber || values.phoneNumber
                ).slice(0, 10)}
                helper={getErrorMessage("phoneNumber", touched, errors)}
                helperIsError
              />

              <Button
                expand="block"
                color="primary"
                type="submit"
                isLoading={isSubmitting}
              >
                Guardar
              </Button>
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Fetcher>
  );
};
