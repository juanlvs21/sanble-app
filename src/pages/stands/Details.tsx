import React, { useState } from "react";
import {
  IonCard,
  IonToast,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { RefresherEventDetail } from "@ionic/core";

// Styles
import styles from "./Stands.module.css";

// Images
import NoImage from "../../assets/images/no-image.png";

// Layout
import Layout from "../../layouts/Main";

// Components
import ImageSkeleton from "../../components/skeleton/Image";
import DetailsSkeleton from "../../components/skeleton/stands/Details";
import Rating from "../../components/stars/Rating";

// Hooks
import useStands from "../../hooks/useStands";

const StandDetails: React.FC = () => {
  const { uuid }: { uuid: string } = useParams();
  const {
    loading,
    standDetails,
    errors,
    showErrors,
    setShowErrors,
    handleGetDetails,
    handleClearDetails,
  } = useStands();

  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const [segmentSelected, setSegmentSelected] = useState<string>("items");

  useIonViewDidEnter(() => handleGetDetails(uuid), [uuid]);
  useIonViewDidLeave(() => handleClearDetails(), [uuid]);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    handleGetDetails(uuid).then(() => event.detail.complete());
  };

  return (
    <Layout simpleToolbar={true} doRefresh={handleRefresh}>
      {loadingImg && (
        <ImageSkeleton className={styles.details_image_skeleton} />
      )}

      {loading ? (
        <DetailsSkeleton />
      ) : (
        <>
          <div className={styles.details_image_bg} />
          <img
            className={styles.details_image}
            src={standDetails?.url_photo ? standDetails?.url_photo : NoImage}
            alt={standDetails?.name}
            onLoad={() => setLoadingImg(false)}
          />

          <div className={styles.details_name_and_stars}>
            <h1>{standDetails?.name}</h1>
            <Rating
              stars={standDetails?.stars as number}
              className={styles.details_stars}
            />
          </div>

          <IonCard className={styles.details_card}>
            <div>
              <blockquote className={styles.details_slogan}>
                {standDetails?.slogan}
              </blockquote>
              <p className={styles.details_description}>
                {standDetails?.description}
              </p>
            </div>

            <IonSegment
              value={segmentSelected}
              onIonChange={({ detail }) =>
                setSegmentSelected(detail.value as string)
              }
            >
              <IonSegmentButton value="items">
                <IonLabel>Artículos</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="ads">
                <IonLabel>Anuncios</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="reviews">
                <IonLabel>Opiniones</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCard>
        </>
      )}

      <IonToast
        isOpen={showErrors}
        onDidDismiss={() => setShowErrors(false)}
        message={errors}
        duration={3000}
      />
    </Layout>
  );
};

export default StandDetails;
