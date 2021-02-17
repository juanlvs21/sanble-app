import React from "react";
import { IonButton } from "@ionic/react";

// Layout
import Layout from "../../layouts/Main";

// Components
import TabBar from "../../components/tabbars/TabBarHome";

const Home: React.FC = () => {
  return (
    <Layout tabBar={<TabBar />}>
      <h1>Bienvenido</h1>
      <IonButton
        expand="block"
        color="primary"
        fill="outline"
        routerLink="/stands"
      >
        Stands
      </IonButton>
    </Layout>
  );
};

export default Home;
