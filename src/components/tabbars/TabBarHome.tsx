import React from "react";
import { useLocation } from "react-router-dom";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, megaphoneOutline, cartOutline } from "ionicons/icons";

interface AppPage {
  url: string;
  tab: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
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
    title: "Stads",
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
          href={appPage.url}
          tab={appPage.tab}
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
