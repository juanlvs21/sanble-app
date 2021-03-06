import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

// Styles
import styles from "./Card.module.css";

// Images
import NoImage from "../../assets/images/no-image.png";

// Components
import ImageSkeleton from "../skeleton/Image";
import Rating from "../stars/Rating";

interface ContainerProps {
  uuid: string;
  name: string;
  description: string;
  stars: number;
  url_photo?: string;
}

const StandCard: React.FC<ContainerProps> = ({
  uuid,
  name,
  description,
  stars,
  url_photo,
}) => {
  const [loadingImg, setLoadingImg] = useState<boolean>(true);

  return (
    <IonCard
      className={`${styles.card} animate__animated animate__fadeIn`}
      routerLink={`/stand/${uuid}`}
    >
      <div className={styles.container}>
        <div className={styles.image_container}>
          {loadingImg && <ImageSkeleton className={styles.image_skeleton} />}

          <img
            className={styles.image}
            src={url_photo ? url_photo : NoImage}
            alt={name}
            onLoad={() => setLoadingImg(false)}
            onError={() => setLoadingImg(false)}
          />
        </div>
        <div className={styles.content}>
          <IonCardHeader className={styles.header}>
            <IonCardTitle>{name}</IonCardTitle>
            <IonCardSubtitle className={styles.subtitle}>
              <Rating stars={Math.ceil(stars)} />
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

export default StandCard;
