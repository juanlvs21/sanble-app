import { IonCard, IonCardTitle } from "@ionic/react";

import styles from "./CardCarousel.module.css";
import { productText, productIcon } from "@/utils/productData";
import { TProductType } from "@/types/TProduct";

export type ComponentProps = {
  /**
   * Type product card
   */
  type: TProductType;
};

export const ProductCardCarousel: React.FC<ComponentProps> = ({ type }) => {
  return (
    <IonCard className={`${styles.card} animate__animated animate__fadeIn`}>
      <img
        src={productIcon[type]}
        alt={productText[type]}
        className={styles.icon}
      />
      <IonCardTitle className={styles.name}>{productText[type]}</IonCardTitle>
    </IonCard>
  );
};
