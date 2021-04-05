import React, { useState, useMemo } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";

// Styles
import styles from "./Card.module.css";

// Images
import NoImage from "../../assets/images/no-image.png";

// Components
import ImageSkeleton from "../skeleton/Image";
import Rating from "../stars/Rating";

// Interfaces
import { Photograph, TFairType } from "../../interfaces/IFairs";

// Utils
import { fairTypeSpanish } from "../../utils/fairType";

interface ContainerProps {
  uuid: string;
  name: string;
  description: string;
  stars: number;
  approved: boolean;
  type: TFairType;
  photographs: Array<Photograph>;
}

const FairCard: React.FC<ContainerProps> = ({
  uuid,
  name,
  description,
  stars,
  approved,
  type,
  photographs,
}) => {
  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const cover = useMemo(
    () => photographs.find((photo: Photograph) => photo.cover)?.url_photo,
    [photographs]
  );

  return (
    <IonCard
      className={`${styles.card} animate__animated animate__fadeIn`}
      routerLink={`/fair/${uuid}`}
    >
      <div className={styles.container}>
        <div className={styles.image_container}>
          {loadingImg && <ImageSkeleton className={styles.image_skeleton} />}

          <img
            className={styles.image}
            src={cover ? `${cover}` : NoImage}
            alt={name}
            onLoad={() => setLoadingImg(false)}
            onError={() => setLoadingImg(false)}
          />

          <div className={styles.container_icons}>
            <Rating className={styles.stars} stars={Math.ceil(stars)} />

            <IonIcon
              icon={approved ? checkmarkCircleOutline : closeCircleOutline}
              className={`${styles.iconStatus} ${approved && styles.approved}`}
            />
          </div>
        </div>
        <div className={styles.content}>
          <IonCardHeader className={styles.header}>
            <IonCardTitle>{name}</IonCardTitle>
            <IonCardSubtitle className={styles.subtitle}>
              <span className={styles.type}>{fairTypeSpanish(type)}</span>
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {description}
            <br />
          </IonCardContent>
        </div>
      </div>
    </IonCard>
  );
};

export default FairCard;
