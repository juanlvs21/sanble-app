import {
  IonAvatar,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  useIonAlert,
} from "@ionic/react";
import { useMemo } from "react";
import { FaDoorClosed, FaHeart, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link, useLocation, useMatch } from "react-router-dom";

import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import styles from "./Sidebar.module.css";

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const [presentAlert] = useIonAlert();
  const { showSidebar, handleShowSidebar } = useApp();
  const { handleSignOut } = useAuth();
  const { user } = useUser();

  const matchHome = useMatch("/app");
  const matchFairsList = useMatch("/app/ferias");
  const matchStandsList = useMatch("/app/stands");
  const matchProductsList = useMatch("/app/productos");
  const matchFavorites = useMatch("/app/favoritos");
  const matchMySanble = useMatch("/app/misanble");
  const matchNearYou = useMatch("/app/cerca");
  // const matchMessages = useMatch("/app/mensajes");
  const matchProfile = useMatch("/app/perfil");

  const items = useMemo(
    () => [
      {
        label: "Inicio",
        path: "/app",
        icon: <FiHome size={28} />,
        active:
          matchHome || matchFairsList || matchStandsList || matchProductsList,
      },
      {
        label: "Favoritos",
        path: "/app/favoritos",
        icon: <FaHeart size={28} />,
        active: matchFavorites,
      },
      {
        label: "Mi Sanble",
        path: "/app/misanble",
        icon: (
          <img
            src={`/assets/icon/${matchMySanble ? "logo" : "logoWhite"}.png`}
            alt="Sanble"
          />
        ),
        active: matchMySanble,
      },
      {
        label: "Cerca de ti",
        path: "/app/cerca",
        icon: <FaMapMarkedAlt size={28} />,
        active: matchNearYou,
      },
      // {
      //   label: "Mensajes",
      //   path: "/mensajes",
      //   icon: <MdMessage size={28} />,
      //   active:matchMessages,
      // },
      {
        label: "Perfil",
        path: "/app/perfil",
        icon: <FaUser size={28} />,
        active: matchProfile,
      },
    ],
    [pathname]
  );

  const handleClickSignOut = () =>
    presentAlert({
      header: "Salir de Sanble",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Salir",
          role: "confirm",
          handler: handleSignOut,
        },
      ],
    });

  return (
    <nav
      className={`${styles.sidebar} ${showSidebar ? styles.showSidebar : ""}`}
    >
      <IonButton
        fill="clear"
        size="small"
        onClick={() => handleShowSidebar(false)}
        className={styles.btnCloseSidebar}
      >
        <IoIosCloseCircleOutline size={24} />
      </IonButton>

      <div className={styles.sidebarUserContainer}>
        <img src={user?.photoURL} />
        <IonText>
          <h4>{user?.displayName}</h4>
        </IonText>
        <IonText>
          <span>{user?.email}</span>
        </IonText>
      </div>

      <section className={styles.sidebarListContainer}>
        <IonList className={styles.sidebarList}>
          {items.map((item) => (
            <Link to={item.path} key={item.path}>
              <IonItem
                className={`${styles.sidebarItem} ${
                  item.active ? styles.sidebarItemActive : ""
                }`}
                detail={false}
                button
              >
                <IonAvatar slot="start" className={styles.sidebarItemIcon}>
                  {item.icon}
                </IonAvatar>
                <IonLabel className={styles.sidebarItemLabel}>
                  {item.label}
                </IonLabel>
              </IonItem>
            </Link>
          ))}
          <IonItem
            className={`${styles.sidebarItem} ${styles.sidebarItemLogout}`}
            onClick={handleClickSignOut}
            detail={false}
            button
          >
            <IonAvatar slot="start" className={styles.sidebarItemIcon}>
              <FaDoorClosed size={28} />
            </IonAvatar>
            <IonLabel className={styles.sidebarItemLabel}>Salir</IonLabel>
          </IonItem>
        </IonList>
      </section>
    </nav>
  );
};
