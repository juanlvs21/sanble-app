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

const CardStand: React.FC<ContainerProps> = ({
  uuid,
  name,
  description,
  stars,
  url_photo,
}) => {
  const [loadingImg, setLoadingImg] = useState<boolean>(true);

  return (
    <IonCard className={styles.card} href={`/stands/${uuid}`}>
      <div className={styles.container}>
        <div>
          {loadingImg && <ImageSkeleton className={styles.image_skeleton} />}

          <img
            className={styles.image}
            src={url_photo ? url_photo : NoImage}
            alt={name}
            onLoad={() => setLoadingImg(false)}
          />
        </div>
        <div className={styles.content}>
          <IonCardHeader className={styles.header}>
            <IonCardTitle>{name}</IonCardTitle>
            <IonCardSubtitle className={styles.subtitle}>
              <Rating stars={stars} />
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

export default CardStand;
