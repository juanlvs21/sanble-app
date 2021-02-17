import React from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";

import Toolbar from "../components/toolbar/Toolbar";

interface ContainerProps {
  children: React.ReactNode;
  tabBar?: React.ReactNode;
}

const MainLayout: React.FC<ContainerProps> = ({ children, tabBar }) => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>

      <IonContent>{children}</IonContent>
      {tabBar}
    </IonPage>
  );
};

export default MainLayout;
