import React from "react";
import { IonPage, IonContent } from "@ionic/react";

interface ContainerProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<ContainerProps> = ({ children }) => {
  return (
    <IonPage>
      <IonContent id="main-content">
        <main style={{ padding: "10px 20px" }}>{children}</main>
      </IonContent>
    </IonPage>
  );
};

export default MainLayout;
