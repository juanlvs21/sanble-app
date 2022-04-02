import { IonAvatar, IonButton, IonText } from "@ionic/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import styles from "./Sidebar.module.css";

type ComponentProps = {
  /**
   * Show Sidebar
   */
  show: boolean;
  /**
   * Callback to handle show Sidebar
   */
  toggleSidebar?: (show?: boolean) => void;
};

export const Sidebar: React.FC<ComponentProps> = ({
  show,
  toggleSidebar = () => {},
}) => {
  return (
    <div className={`${styles.sidebar} ${show ? styles.show : ""}`}>
      <IonButton
        slot="end"
        fill="clear"
        color="light"
        className={styles.closeSidebarBtn}
        onClick={() => toggleSidebar(false)}
      >
        <IoIosCloseCircleOutline size={32} />
      </IonButton>
      <div className={styles.userData}>
        <IonAvatar className={styles.avatarImg}>
          <img
            src="https://bestprofilepictures.com/wp-content/uploads/2020/07/Cool-Profile-Picture-For-Instagram-1003x1024.jpg"
            alt="Perfil"
          />
        </IonAvatar>
        <IonText>
          <h1>Nestor Juarez</h1>
        </IonText>
        <IonText>
          <p>nestorjavierjuare@gmail.com</p>
        </IonText>
      </div>
    </div>
  );
};
