import React from "react";
import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";

// Styles
import styles from "./Rating.module.css";

interface ContainerProps {
  stars: number;
}

const Rating: React.FC<ContainerProps> = ({ stars }) => {
  return (
    <div className={styles.stars_container}>
      {Array.from({ length: stars }, (_, i) => (
        <IonIcon icon={star} key={i} />
      ))}
      {Array.from({ length: 5 - stars }, (_, i) => (
        <IonIcon icon={starOutline} key={i} />
      ))}
    </div>
  );
};

export default Rating;
