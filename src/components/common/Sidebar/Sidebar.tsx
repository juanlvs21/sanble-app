import { useMemo } from "react";
import {
  IonAvatar,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { FaDoorClosed, FaHeart, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import { useHistory, useLocation } from "react-router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { HiHome } from "react-icons/hi";

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
  const { push } = useHistory();
  const { pathname } = useLocation();

  const handleNavigate = (path: string) => {
    toggleSidebar(false);
    push(path);
  };

  const items = useMemo(
    () => [
      {
        label: "Inicio",
        path: "/inicio",
        icon: <HiHome size={32} />,
        active:
          pathname.includes("/inicio") ||
          pathname.includes("/ferias") ||
          pathname.includes("/stands") ||
          false,
      },
      {
        label: "Mi Sanble",
        path: "/mi-sanble",
        icon: pathname.includes("/mi-sanble") ? (
          <img src="/assets/icon/logo.png" alt="Sanble" />
        ) : (
          <img src="/assets/icon/logoWhite.png" alt="Sanble" />
        ),
        active: pathname.includes("/mi-sanble"),
      },
      {
        label: "Cerca de ti",
        path: "/cerca",
        icon: <FaMapMarkedAlt size={32} />,
        active: pathname.includes("/cerca"),
      },
      {
        label: "Favoritos",
        path: "/favoritos",
        icon: <FaHeart size={32} />,
        active: pathname.includes("/favoritos"),
      },
      {
        label: "Mensajes",
        path: "/mensajes",
        icon: <MdMessage size={32} />,
        active: pathname.includes("/mensajes"),
      },
      {
        label: "Perfil",
        path: "/perfil",
        icon: <FaUser size={32} />,
        active: pathname.includes("/perfil"),
      },
    ],
    [pathname]
  );

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
          <h1>Néstor Juárez</h1>
        </IonText>
        <IonText>
          <p>nestorjavierjuare@gmail.com</p>
        </IonText>
      </div>
      <IonList className={styles.list}>
        {items.map((item) => (
          <IonItem
            className={`${styles.item} ${item.active ? styles.itemActive : ""}`}
            onClick={() => handleNavigate(item.path)}
            key={item.path}
            button
          >
            <IonAvatar slot="start" className={styles.itemIcon}>
              {item.icon}
            </IonAvatar>
            <IonLabel className={styles.itemLabel}>{item.label}</IonLabel>
          </IonItem>
        ))}
        <IonItem
          className={`${styles.item} ${styles.itemLogout}`}
          onClick={() => alert("Sessión cerrada")}
          button
        >
          <IonAvatar slot="start" className={styles.itemIcon}>
            <FaDoorClosed size={32} />
          </IonAvatar>
          <IonLabel className={styles.itemLabel}>Cerrar Sesión</IonLabel>
        </IonItem>
      </IonList>
    </div>
  );
};
