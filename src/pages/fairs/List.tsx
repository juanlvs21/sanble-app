import React from "react";
import {
  IonToast,
  useIonViewDidEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";

// Styles
import styles from "./Fairs.module.css";

// Layout
import Layout from "../../layouts/Main";

// Components
import TabBar from "../../components/tabbars/TabBarHome";
import Card from "../../components/fairs/Card";
import CardSkeleton from "../../components/skeleton/general/Card";

// Hooks
import useFairs from "../../hooks/useFairs";

// Interfaces
import IFairs from "../../interfaces/IFairs";

const FairsList: React.FC = () => {
  const {
    loading,
    fairsList,
    handleGetList,
    handleGetNextList,
    showErrors,
    setShowErrors,
    errors,
  } = useFairs();

  useIonViewDidEnter(() => handleGetList());

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    handleGetList().then(() => event.detail.complete());
  };

  const handleNextData = (event: any) => {
    handleGetNextList().then(() => event.target.complete());
  };

  return (
    <Layout tabBar={<TabBar />} doRefresh={handleRefresh}>
      <div className={styles.list_container}>
        {loading &&
          !fairsList.length &&
          [1, 2, 3].map((i) => <CardSkeleton key={i} />)}

        {fairsList.map((fair: IFairs) => (
          <Card key={fair.uuid} {...fair} />
        ))}
      </div>

      <IonInfiniteScroll onIonInfinite={handleNextData} disabled={loading}>
        <IonInfiniteScrollContent
          loadingSpinner="dots"
          loadingText="Cargando..."
        />
      </IonInfiniteScroll>

      <IonToast
        isOpen={showErrors}
        onDidDismiss={() => setShowErrors(false)}
        message={errors}
        duration={3000}
      />
    </Layout>
  );
};

export default FairsList;
