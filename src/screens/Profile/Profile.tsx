import { IonAvatar, IonCol, IonGrid, IonRow } from "@ionic/react";
import { BiEnvelope, BiPhone, BiUser } from "react-icons/bi";

import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Input } from "@/components/common/forms/Input";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";
import styles from "./Profile.module.css";

export const Profile = () => {
  const { user } = useUser();
  const title = user?.displayName || user?.email || "Mi Perfil";
  useDocumentTitleApp(`${title} 👤`);

  // email: 'user@example.com',
  // phoneNumber: '+11234567890',
  // displayName: 'John Doe',
  // photoURL: 'http://www.example.com/12345678/photo.png',

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
            <form className={`${styles.profileForm}`}>
              <h2 className={`${styles.profileTitle}`}>Datos del Usuario</h2>

              <Input
                placeholder="Nombre"
                type="text"
                name="displayName"
                Icon={<BiUser />}
                // onIonInput={handleChange}
                // onIonBlur={handleBlur}
                // disabled={isSubmitting}
                value={user?.displayName}
                // helper={getErrorMessage("email", touched, errors)}
                helperIsError
              />

              <Input
                placeholder="Correo electrónico"
                type="email"
                name="email"
                inputmode="email"
                Icon={<BiEnvelope />}
                // onIonInput={handleChange}
                // onIonBlur={handleBlur}
                // disabled={isSubmitting}
                value={user?.email}
                // helper={getErrorMessage("email", touched, errors)}
                helperIsError
              />

              <Input
                placeholder="Teléfono"
                type="text"
                name="phoneNumber"
                inputmode="tel"
                Icon={<BiPhone />}
                // onIonInput={handleChange}
                // onIonBlur={handleBlur}
                // disabled={isSubmitting}
                value={user?.phoneNumber}
                // helper={getErrorMessage("email", touched, errors)}
                helperIsError
              />
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Fetcher>
  );
};
