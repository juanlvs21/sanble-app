import {
  IonAvatar,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import { useMemo } from "react";
import { FaDoorClosed, FaHeart, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";

import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Sidebar.module.css";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showSidebar, handleShowSidebar } = useApp();
  const { user } = useAuth();

  const matchHome = useMatch("/app");
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
        icon: <HiHome size={28} />,
        active: matchHome,
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

  const handleNavigate = (path: string) => navigate(path);

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
            onClick={() => alert("Sessión cerrada")}
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
