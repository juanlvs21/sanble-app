import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import styles from "./Header.module.css";

type ComponentProps = {
  /**
   * Toolbar title
   *
   * @default "Sanble"
   */
  title?: string;
  /**
   * Element on the end of the toolbar (Must have property slot="end")
   */
  headerEnd?: React.ReactNode;
  /**
   * Callback to handle open Sidebar
   */
  onOpen?: () => void;
  /**
   * Scroll top
   *
   * @default 0
   */
  scrollTop?: number;
};

export const Header: React.FC<ComponentProps> = ({
  title = "Sanble",
  onOpen = () => {},
  scrollTop = 0,
  headerEnd,
}) => (
  <IonHeader className={styles.header}>
    <IonToolbar
      className={`${styles.toolbar} ${scrollTop > 25 ? styles.fill : ""}`}
    >
      <IonButton
        slot="start"
        className={styles.avatarBtn}
        fill="clear"
        onClick={onOpen}
      >
        <IonAvatar className={styles.avatarImg}>
          <img
            src="https://bestprofilepictures.com/wp-content/uploads/2020/07/Cool-Profile-Picture-For-Instagram-1003x1024.jpg"
            alt="Perfil"
          />
        </IonAvatar>
      </IonButton>
      <IonTitle>{title}</IonTitle>
      {headerEnd || <div slot="end" className={styles.headerEndFake} />}
    </IonToolbar>
  </IonHeader>
);
