import { IonSlides, IonSlide } from "@ionic/react";

import styles from "./Carousel.module.css";

type ComponentProps = {
  /**
   * Data
   */
  data: any[];
  /**
   * Unique primary key name
   */
  keyName: string;
  /**
   * Card Element
   */
  card: (data: any) => React.ReactElement;
};

export const Carousel: React.FC<ComponentProps> = ({ data, keyName, card }) => {
  const slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.5,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 400,
    autoplay: false,
  };

  return (
    <IonSlides pager={true} options={slideOpts} className={styles.carousel}>
      {data.map((dat) => (
        <IonSlide key={dat[keyName]}>{card(dat)}</IonSlide>
      ))}
    </IonSlides>
  );
};
