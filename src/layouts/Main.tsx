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
  simpleToolbar?: boolean;
}

const MainLayout: React.FC<ContainerProps> = ({
  children,
  tabBar,
  doRefresh,
  simpleToolbar,
}) => {
  const { isMobile } = useApp();

  return (
    <IonPage>
      <IonHeader>
        <Toolbar simple={simpleToolbar && isMobile()} />
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
