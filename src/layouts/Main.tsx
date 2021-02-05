import React from "react";
import { IonPage, IonContent } from "@ionic/react";

interface ContainerProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<ContainerProps> = ({ children }) => {
  return (
    <IonPage>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default MainLayout;
