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
   * Callback to handle show Sidebar
   */
  toggleSidebar?: (show?: boolean) => void;
  /**
   * Scroll top
   *
   * @default 0
   */
  scrollTop?: number;
};

export const Header: React.FC<ComponentProps> = ({
  title = "Sanble",
  toggleSidebar = () => {},
  scrollTop = 0,
  headerEnd,
}) => {
  return (
    <IonHeader className={styles.header}>
      <IonToolbar
        className={`${styles.toolbar} ${scrollTop > 25 ? styles.fill : ""}`}
      >
        <IonButton
          slot="start"
          className={styles.avatarBtn}
          fill="clear"
          onClick={() => toggleSidebar()}
        >
          <IonAvatar className={styles.avatarImg}>
            <img
              src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
              alt="example"
            />
          </IonAvatar>
        </IonButton>
        <IonTitle>{title}</IonTitle>
        {headerEnd || <div slot="end" className={styles.headerEndFake} />}
      </IonToolbar>
    </IonHeader>
  );
};
