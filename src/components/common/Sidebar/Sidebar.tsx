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
import { Link, useLocation, useMatch } from "react-router-dom";

import { ImageExtended } from "@/components/common/ImageExtended";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [presentAlert] = useIonAlert();
  const { isCapacitor, showSidebar, handleShowSidebar } = useApp();
  const { handleSignOut } = useAuth();
  const { user } = useUser();

  const matchHome = useMatch(ERoutesName.APP);
  const matchFairsList = useMatch(ERoutesName.FAIRS_LIST);
  const matchStandsList = useMatch(ERoutesName.STANDS_LIST);
  const matchProductsList = useMatch(ERoutesName.PRODUCTS_LIST);
  const matchFavorites = useMatch(ERoutesName.FAVORITES);
  const matchMySanbleFairs = useMatch(ERoutesName.MY_SANBLE_FAIRS);
  const matchMySanbleStands = useMatch(ERoutesName.MY_SANBLE_STANDS);
  const matchNearYou = useMatch(ERoutesName.NEAR_YOU);
  // const matchMessages = useMatch("/app/mensajes");
  const matchProfile = useMatch(ERoutesName.PROFILE);

  const items = useMemo(
    () => [
      {
        label: "Inicio",
        path: ERoutesName.APP,
        icon: <FiHome size={28} />,
        active:
          matchHome || matchFairsList || matchStandsList || matchProductsList,
      },
      {
        label: "Favoritos",
        path: ERoutesName.FAVORITES,
        icon: <FiHeart size={28} />,
        active: matchFavorites,
      },
      {
        label: "Mi Sanble",
        path: ERoutesName.MY_SANBLE_FAIRS,
        icon: (
          <img
            src={`/assets/icon/${
              matchMySanbleFairs || matchMySanbleStands ? "logo" : "logoWhite"
            }.png`}
            alt="Sanble"
          />
        ),
        active: matchMySanbleFairs || matchMySanbleStands,
      },
      {
        label: "Cerca de ti",
        path: ERoutesName.NEAR_YOU,
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
        path: ERoutesName.PROFILE,
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
            <Link key={item.path} to={item.path}>
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
              <FiLogOut size={28} />
            </IonAvatar>
            <IonLabel className={styles.sidebarItemLabel}>Salir</IonLabel>
          </IonItem>
        </IonList>
      </section>
    </nav>
  );
};
