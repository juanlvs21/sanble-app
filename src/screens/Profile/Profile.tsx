import { IonAvatar, IonCol, IonGrid, IonRow } from "@ionic/react";

import { Fetcher } from "@/components/common/Fetcher";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";
import styles from "./Profile.module.css";
import { ImageExtended } from "@/components/common/ImageExtended";

export const Profile = () => {
  const { user } = useUser();
  const title = user?.displayName || user?.email || "Mi Perfil";
  useDocumentTitleApp(`${title} 👤`);

  return (
    <Fetcher
      // handleRefresh={handleRefresh}
      // handleInfiniteScroll={handleInfinite}
      classNameSection="animate__animated animate__screenInUp"
      // isLoading={isLoading || isLoading}
    >
      <IonGrid className={`${styles.profileGrid}`}>
        <IonRow>
          <IonCol className={`${styles.profileCol}`}>
            <IonAvatar className={`${styles.profileAvatar}`}>
              <ImageExtended
                src={user?.photoURL}
                alt={title}
                className={`${styles.profileAvatar}`}
              />
            </IonAvatar>
          </IonCol>
          <IonCol className={`${styles.profileCol}`}>form</IonCol>
        </IonRow>
      </IonGrid>
    </Fetcher>
  );
};
