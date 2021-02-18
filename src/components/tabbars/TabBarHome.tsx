import React from "react";
import { useLocation } from "react-router-dom";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, megaphoneOutline, cartOutline } from "ionicons/icons";

// Interfaces
import IPage from "../../interfaces/IPage";

const appPages: IPage[] = [
  {
    title: "Inicio",
    tab: "home",
    url: "/home",
    icon: homeOutline,
  },
  {
    title: "Ferias",
    tab: "fairs",
    url: "/fairs",
    icon: megaphoneOutline,
  },
  {
    title: "Stands",
    tab: "stands",
    url: "/stands",
    icon: cartOutline,
  },
];

const TabBarHome: React.FC = () => {
  const location = useLocation();

  return (
    <IonTabBar slot="bottom">
      {appPages.map((appPage, i) => (
        <IonTabButton
          mode="ios"
          tab={appPage.tab}
          href={appPage.url}
          key={i}
          className={location.pathname === appPage.url ? "selected" : ""}
        >
          <IonIcon icon={appPage.icon} />
          <IonLabel>{appPage.title}</IonLabel>
        </IonTabButton>
      ))}
    </IonTabBar>
  );
};

export default TabBarHome;
