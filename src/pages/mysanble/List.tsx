import React, { useState, useMemo } from "react";
import {
  IonCard,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonToast,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewDidEnter,
  // useIonViewDidLeave,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import { add, megaphoneOutline, cartOutline } from "ionicons/icons";

// Styles
import styles from "./MySanble.module.css";

// Layout
import Layout from "../../layouts/Main";

// Components
import Card from "../../components/stands/Card";
import CardSkeleton from "../../components/skeleton/general/Card";
import NewStandModal from "../../components/mysanble/NewStandModal";

// Hooks
import useStands from "../../hooks/useStands";
import useAuth from "../../hooks/useAuth";

// Interfaces
import IStands from "../../interfaces/IStands";
import { TQueryWhere } from "../../interfaces/IFirebase";

const MySanbleList: React.FC = () => {
  const [segmentSelected, setSegmentSelected] = useState<string>("stands");
  const [showModalNewStand, setShowNewStandModal] = useState<boolean>(false);
  const {
    session: { user },
  } = useAuth();
  const {
    loading: loadingStand,
    handleGetList: handleGetListStands,
    handleGetNextList: handleGetNextListStands,
    setShowErrors: setShowErrorsStands,
    showErrors: showErrorsStands,
    errors: errorsStands,
    standsList,
  } = useStands();

  const queryWhereStands: TQueryWhere = useMemo(
    () => ({
      field: "uuid_user",
      op: "==",
      value: user.uid,
    }),
    [user]
  );

  useIonViewDidEnter(() => {
    setSegmentSelected("stands");
    handleGetListStands(queryWhereStands);
  }, []);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    if (segmentSelected === "stands")
      handleGetListStands(queryWhereStands).then(() => event.detail.complete());
  };

  const handleNextDataStands = (event: any) => {
    handleGetNextListStands().then(() => event.target.complete());
  };

  const renderScrollInfinite = (handleNextData: any, loading: boolean) => (
    <IonInfiniteScroll onIonInfinite={handleNextData} disabled={loading}>
      <IonInfiniteScrollContent
        loadingSpinner="bubbles"
        loadingText="Cargando..."
      />
    </IonInfiniteScroll>
  );

  return (
    <Layout doRefresh={handleRefresh}>
      <IonCard>
        <IonSegment
          value={segmentSelected}
          onIonChange={({ detail }) =>
            setSegmentSelected(detail.value as string)
          }
        >
          <IonSegmentButton value="stands">
            <IonLabel className={styles.list_segment_label}>
              Mis Stands
              <IonIcon icon={cartOutline} />
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="fairs">
            <IonLabel className={styles.list_segment_label}>
              Mis Ferias
              <IonIcon icon={megaphoneOutline} />
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonCard>

      {segmentSelected === "stands" && (
        <>
          <section className={styles.list_container}>
            {loadingStand &&
              !standsList.length &&
              [1, 2, 3].map((i) => <CardSkeleton key={i} />)}

            {standsList.map((stand: IStands) => (
              <Card key={stand.uuid} {...stand} />
            ))}
          </section>

          {renderScrollInfinite(handleNextDataStands, loadingStand)}
        </>
      )}

      <IonToast
        isOpen={showErrorsStands} // showErrorsStands || showErrorsFaris
        onDidDismiss={() => {
          setShowErrorsStands(false); // setShowErrorsFairs(false)
        }}
        message={errorsStands} // errorsStands || errorsFairs
        duration={3000}
      />

      <IonFab
        vertical="bottom"
        horizontal="end"
        className={styles.list_floating_btn}
      >
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={megaphoneOutline} />
          </IonFabButton>
          <IonFabButton onClick={() => setShowNewStandModal(true)}>
            <IonIcon icon={cartOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>

      <NewStandModal
        showModal={showModalNewStand}
        setShowModal={setShowNewStandModal}
      />
    </Layout>
  );
};

export default MySanbleList;
