import React from "react";
import { IonButton } from "@ionic/react";

// Layout
import Layout from "../../layouts/Main";

// Components
import TabBar from "../../components/tabbars/TabBarHome";

const StandsList: React.FC = () => {
  return (
    <Layout tabBar={<TabBar />}>
      <h1>Stands List</h1>
      <IonButton
        expand="block"
        color="primary"
        fill="outline"
        routerLink="/home"
      >
        Home
      </IonButton>
    </Layout>
  );
};

export default StandsList;
