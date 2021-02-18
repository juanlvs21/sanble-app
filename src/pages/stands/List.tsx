import React from "react";
import { IonToast, useIonViewWillEnter } from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";

// Layout
import Layout from "../../layouts/Main";

// Components
import TabBar from "../../components/tabbars/TabBarHome";
import Card from "../../components/stands/Card";
import CardSkeleton from "../../components/skeleton/CardStand";

// Hooks
import useStands from "../../hooks/useStands";

// Interfaces
import IStands from "../../interfaces/IStands";

const StandsList: React.FC = () => {
  const {
    loading,
    standsList,
    handleGetList,
    showErrors,
    setShowErrors,
    errors,
  } = useStands();

  useIonViewWillEnter(() => handleGetList());

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    handleGetList().then(() => event.detail.complete());
  };

  return (
    <Layout tabBar={<TabBar />} doRefresh={handleRefresh}>
      {loading &&
        !standsList.length &&
        [1, 2, 3].map((i) => <CardSkeleton key={i} />)}

      {standsList.map((stand: IStands) => (
        <Card key={stand.uuid} {...stand} />
      ))}

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
