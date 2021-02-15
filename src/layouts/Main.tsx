import React from "react";
import { IonPage, IonContent } from "@ionic/react";

// Components
import Toolbar from "../components/toolbar/Toolbar";

interface ContainerProps {
  children: React.ReactNode;
  tabBar?: React.ReactNode;
}

const MainLayout: React.FC<ContainerProps> = ({ children, tabBar }) => {
  return (
    <IonPage>
      <Toolbar />
      <IonContent>
        <main style={{ padding: "10px 20px" }}>{children}</main>
      </IonContent>
      {tabBar}
    </IonPage>
  );
};

export default MainLayout;
