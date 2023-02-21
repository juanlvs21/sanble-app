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
import { FiHeart, FiHome, FiLogOut, FiMapPin, FiUser } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation, useRouteMatch } from "react-router";

import { ImageExtended } from "@/components/common/ImageExtended";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [presentAlert] = useIonAlert();
  const { isCapacitor, showSidebar, handleShowSidebar } = useApp();
  const { handleSignOut } = useAuth();
  const { user } = useUser();

  const matchHome = useRouteMatch({
    path: "/app",
    exact: true,
  });
  const matchFairsList = useRouteMatch({
    path: "/app/ferias",
    exact: true,
  });
  const matchStandsList = useRouteMatch({
    path: "/app/stands",
    exact: true,
  });
  const matchProductsList = useRouteMatch({
    path: "/app/productos",
    exact: true,
  });
  const matchFavorites = useRouteMatch({
    path: "/app/favoritos",
    exact: true,
  });
  const matchMySanble = useRouteMatch({
    path: "/app/misanble",
    exact: true,
  });
  const matchNearYou = useRouteMatch({
    path: "/app/cerca",
    exact: true,
  });
  // const matchMessages = useRouteMatch({
  //   path: "/app/mensajes",
  //   exact: true,
  // });
  const matchProfile = useRouteMatch({
    path: "/app/perfil",
    exact: true,
  });

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
        icon: <FiHeart size={28} />,
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
        icon: <FiMapPin size={28} />,
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
        icon: <FiUser size={28} />,
        active: matchProfile,
      },
    ],
    [pathname]
  );

  const handleClickSignOut = () =>
    presentAlert({
      header: "¿Cerrar sessión?",
      buttons: [
        {
          text: "No",
          role: "cancel",
        },
        {
          text: "Si",
          role: "confirm",
          handler: handleSignOut,
        },
      ],
    });

  return (
    <nav
      className={`${styles.sidebar} ${showSidebar ? styles.showSidebar : ""} ${
        isCapacitor ? styles.isCapacitor : ""
      }`}
    >
      <IonButton
        fill="clear"
        size="small"
        onClick={() => handleShowSidebar(false)}
        className={`${styles.btnCloseSidebar} ${
          isCapacitor ? styles.isCapacitor : ""
        }`}
      >
        <IoIosCloseCircleOutline size={24} />
      </IonButton>

      <div className={styles.sidebarUserContainer}>
        <ImageExtended
          src={user?.photoURL}
          alt="Perfil"
          classNamePicture={styles.sidebarUserPicture}
          className={styles.sidebarUserImg}
          skeletonProps={{
            className: styles.sidebarUserImg,
          }}
        />
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
            <IonItem
              key={item.path}
              routerLink={item.path}
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
          ))}
          <IonItem
            className={`${styles.sidebarItem} ${styles.sidebarItemLogout}`}
            onClick={handleClickSignOut}
            detail={false}
            button
          >
            <IonAvatar slot="start" className={styles.sidebarItemIcon}>
              <FiLogOut size={28} />
            </IonAvatar>
            <IonLabel className={styles.sidebarItemLabel}>Salir</IonLabel>
          </IonItem>
        </IonList>
      </section>
    </nav>
  );
};
