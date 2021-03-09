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
import ItemsList from "../../components/stands/ItemsList";
import PromotionsList from "../../components/stands/PromotionsList";
// import Reviews from "../../components/stands/Reviews";

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

  useIonViewDidEnter(() => {
    setSegmentSelected("items");
    handleGetDetails(uuid);
  }, [uuid]);
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
            <div className={styles.details_slogan_description}>
              {standDetails?.slogan && (
                <blockquote className={styles.details_slogan}>
                  {standDetails?.slogan}
                </blockquote>
              )}
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
              <IonSegmentButton value="promotions">
                <IonLabel>Promociones</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="ads">
                <IonLabel>Anuncios</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {segmentSelected === "items" && (
              <ItemsList items={standDetails?.items} />
            )}
            {segmentSelected === "promotions" && (
              <PromotionsList
                items={standDetails?.items}
                promotions={standDetails?.promotions}
              />
            )}
          </IonCard>

          {/* <Reviews /> */}
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
