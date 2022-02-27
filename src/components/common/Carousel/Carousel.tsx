import { IonSlides, IonSlide } from "@ionic/react";

import styles from "./Carousel.module.css";
import { FairCardCarousel } from "../../fairs/CardCarousel";

export const Carousel: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
    slidesPerView: 1.5,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 400,
  };

  return (
    <IonSlides pager={true} options={slideOpts} className={styles.carousel}>
      <IonSlide>
        <FairCardCarousel />
      </IonSlide>
      <IonSlide>
        <FairCardCarousel />
      </IonSlide>
      <IonSlide>
        <FairCardCarousel />
      </IonSlide>
    </IonSlides>
  );
};
