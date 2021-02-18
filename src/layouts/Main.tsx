import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";

import Toolbar from "../components/toolbar/Toolbar";

// Hooks
import useApp from "../hooks/useApp";

interface ContainerProps {
  children: React.ReactNode;
  tabBar?: React.ReactNode;
  doRefresh?: any;
}

const MainLayout: React.FC<ContainerProps> = ({
  children,
  tabBar,
  doRefresh,
}) => {
  const { isMobile } = useApp();

  return (
    <IonPage>
      <IonHeader>
        <Toolbar />
      </IonHeader>

      <IonContent>
        {isMobile() && doRefresh && (
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent />
          </IonRefresher>
        )}
        <div style={{ padding: 10 }}>{children}</div>
      </IonContent>
      {tabBar}
    </IonPage>
  );
};

export default MainLayout;
