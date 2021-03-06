import React, { useState } from "react";
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  homeOutline,
  personOutline,
  ribbonOutline,
  cogOutline,
  exitOutline,
} from "ionicons/icons";
import { useLocation, useHistory } from "react-router-dom";

//
import styles from "./Menu.module.css";

// Components
import LogoutModal from "../logout/Modal";
import ToggleDarkMode from "../darkMode/Toggle";

// Hooks
import useAuth from "../../hooks/useAuth";

// Interfaces
import IPage from "../../interfaces/IPage";

const appPages: IPage[] = [
  {
    title: "Inicio",
    url: "/home",
    icon: homeOutline,
  },
  {
    title: "Perfil",
    url: "/profile",
    icon: personOutline,
  },
  {
    title: "Mi Sanble",
    url: "/my-sanble",
    icon: ribbonOutline,
  },
  {
    title: "Configuraciones",
    url: "/settings",
    icon: cogOutline,
  },
];

interface ContainerProps {
  setShowLoader?: any;
}

const Menu: React.FC<ContainerProps> = ({ setShowLoader }) => {
  const location = useLocation();
  const history = useHistory();
  const { session, handleLogout } = useAuth();
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const handleShowLogout = () => setShowLogout(true);

  const handleCancelLogout = () => setShowLogout(false);

  const handlerOkLogout = async () => {
    setShowLoader(true);
    await handleLogout().finally(() => {
      setShowLoader(false);
      history.replace("/auth/login");
    });
  };

  return (
    <>
      <IonMenu side="start" contentId="content" hidden={session ? false : true}>
        <IonContent>
          <div className={styles.content}>
            <IonList style={{ padding: 0 }}>
              {appPages.map((appPage, i) => (
                <IonMenuToggle key={i} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon slot="start" icon={appPage.icon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              ))}
              <IonMenuToggle autoHide={false}>
                <IonItem
                  button
                  lines="none"
                  detail={false}
                  onClick={handleShowLogout}
                >
                  <IonIcon slot="start" icon={exitOutline} />
                  <IonLabel>Cerrar Sesión</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
            <div className={styles.toggle}>
              <ToggleDarkMode activePrimary={true} />
            </div>
          </div>
        </IonContent>
      </IonMenu>
      <LogoutModal
        show={showLogout}
        handleCancel={handleCancelLogout}
        handleOk={handlerOkLogout}
      />
    </>
  );
};

export default Menu;
