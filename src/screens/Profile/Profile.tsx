import { IonAvatar, IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiEnvelope, BiImageAdd, BiPhone, BiUser } from "react-icons/bi";

import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/forms/Input";
import { InputPassword } from "@/components/common/forms/InputPassword";
import { ChangeAvatarModal } from "@/components/modules/profile/ChangeAvatarModal";
import { changePasswordSchema } from "@/helpers/validator/auth";
import { userSchema } from "@/helpers/validator/user";
import { useChangeAvatar } from "@/hooks/profile/useChangeAvatar";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";
import { TChangePassword, TUpdateUser } from "@/types/TUser";
import styles from "./Profile.module.css";

export const Profile = () => {
  const { user } = useUser();
  const title = user?.displayName || user?.email || "Mi Perfil";
  useDocumentTitleApp(`${title} 👤`);

  const formUpdateRef = useRef<HTMLFormElement>(null);
  const formChangePassRef = useRef<HTMLFormElement>(null);

  const changeAvatarProps = useChangeAvatar();
  const { handleUpdateUser, handleChangePasswordUser } = useUser();
  const {
    control: controlUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { isSubmitting: isSubmittingUpdate },
  } = useForm<TUpdateUser>({
    values: {
      displayName: user?.displayName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    },
    resolver: userSchema,
  });

  const {
    control: controlChangePass,
    handleSubmit: handleSubmitChangePass,
    reset: resetChangePass,
    formState: { isSubmitting: isSubmittingChangePass },
  } = useForm<TChangePassword>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: changePasswordSchema,
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
              <IonButton
                size="small"
                color="secondary"
                className={`${styles.profileAvatarBtn}`}
                onClick={() => changeAvatarProps.onOpen(true)}
              >
                <BiImageAdd size={25} />
              </IonButton>
            </IonAvatar>

            <ChangeAvatarModal {...changeAvatarProps} />
          </IonCol>

          <IonCol
            size="12"
            size-md="7"
            className={`${styles.profileCol} ${styles.colLeft}`}
          >
            <form
              ref={formUpdateRef}
              onSubmit={handleSubmitUpdate(handleUpdateUser)}
              onKeyUp={(e) =>
                e.key === "Enter" && formUpdateRef.current?.requestSubmit()
              }
              className={`${styles.profileForm}`}
            >
              <h2 className={`${styles.profileTitle}`}>Datos del Usuario</h2>

              <Controller
                control={controlUpdate}
                name="displayName"
                render={({
                  field: { onChange, onBlur, ...field },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="Nombre"
                    type="text"
                    Icon={<BiUser />}
                    onIonInput={onChange}
                    onIonBlur={onBlur}
                    disabled={isSubmittingUpdate}
                    helper={error?.message}
                    helperIsError
                    {...field}
                  />
                )}
              />
              <Controller
                control={controlUpdate}
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
                    disabled={isSubmittingUpdate}
                    helper={error?.message}
                    helperIsError
                    {...field}
                  />
                )}
              />
              <Controller
                control={controlUpdate}
                name="phoneNumber"
                render={({
                  field: { onChange, onBlur, value, ...field },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="Teléfono"
                    type="tel"
                    inputmode="tel"
                    Icon={<BiPhone />}
                    onIonInput={onChange}
                    onIonBlur={onBlur}
                    label="+58"
                    value={(
                      parsePhoneNumberFromString(value, "VE")?.nationalNumber ||
                      value
                    ).slice(0, 10)}
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
                isLoading={isSubmittingUpdate}
              >
                Guardar
              </Button>
            </form>

            <span className={`${styles.divider}`} />

            <form
              ref={formChangePassRef}
              onSubmit={handleSubmitChangePass((values) =>
                handleChangePasswordUser(values, resetChangePass)
              )}
              onKeyUp={(e) =>
                e.key === "Enter" && formChangePassRef.current?.requestSubmit()
              }
              className={`${styles.profileForm}`}
            >
              <h2 className={`${styles.profileTitle}`}>Cambiar Contraseña</h2>

              <Controller
                control={controlChangePass}
                name="password"
                render={({
                  field: { onChange, onBlur, ...field },
                  fieldState: { error },
                }) => (
                  <InputPassword
                    placeholder="Contraseña"
                    onIonInput={onChange}
                    onIonBlur={onBlur}
                    disabled={isSubmittingChangePass}
                    helper={error?.message}
                    helperIsError
                    {...field}
                  />
                )}
              />
              <Controller
                control={controlChangePass}
                name="confirmPassword"
                render={({
                  field: { onChange, onBlur, ...field },
                  fieldState: { error },
                }) => (
                  <InputPassword
                    placeholder="Confirmar Contraseña"
                    onIonInput={onChange}
                    onIonBlur={onBlur}
                    disabled={isSubmittingChangePass}
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
