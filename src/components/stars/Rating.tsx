import React from "react";
import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";

// Styles
import styles from "./Rating.module.css";

interface ContainerProps {
  stars: number;
  className?: string;
}

const Rating: React.FC<ContainerProps> = ({ stars, className = "" }) => {
  return (
    <div className={`${styles.stars_container} ${className}`}>
      {Array.from({ length: stars }, (_, i) => (
        <IonIcon icon={star} key={i} className={styles.star} />
      ))}
      {Array.from({ length: 5 - stars }, (_, i) => (
        <IonIcon icon={starOutline} key={i} className={styles.star} />
      ))}
    </div>
  );
};

export default Rating;
