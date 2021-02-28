import React from "react";
import {
  IonToast,
  useIonViewDidEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";

// Styles
import styles from "./Stands.module.css";

// Layout
import Layout from "../../layouts/Main";

// Components
import TabBar from "../../components/tabbars/TabBarHome";
import Card from "../../components/stands/Card";
import CardSkeleton from "../../components/skeleton/stands/Card";

// Hooks
import useStands from "../../hooks/useStands";

// Interfaces
import IStands from "../../interfaces/IStands";

const StandsList: React.FC = () => {
  const {
    loading,
    standsList,
    handleGetList,
    handleGetNextList,
    showErrors,
    setShowErrors,
    errors,
  } = useStands();

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
          !standsList.length &&
          [1, 2, 3].map((i) => <CardSkeleton key={i} />)}

        {standsList.map((stand: IStands) => (
          <Card key={stand.uuid} {...stand} />
        ))}
      </div>

      <IonInfiniteScroll onIonInfinite={handleNextData} disabled={loading}>
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
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

export default StandsList;
