import React from "react";
import { IonSlide, IonButton, IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";

// Styles
import styles from "./Slides.module.css";

// Hooks
import useApp from "../../hooks/useApp";

interface ContainerProps {
  backgroundColor: string;
  title: string;
  description: string;
  image: any;
  end: boolean;
  i: number;
  length: number;
}

const Slide: React.FC<ContainerProps> = ({
  backgroundColor,
  title,
  description,
  image,
  end,
  i,
  length,
}) => {
  const { setWelcome } = useApp();

  const goLogin = () => setWelcome(false);

  return (
    <IonSlide className={styles.slide}>
      <div className={styles.container} style={{ backgroundColor }}>
        <div className={styles.containerContent}>
          <img className={styles.image} src={image} alt={title} />

          {end ? (
            <>
              <p className={styles.description}>{title}</p>
              <IonButton
                expand="block"
                color="dark"
                className={styles.btn}
                onClick={goLogin}
              >
                {description}
              </IonButton>
            </>
          ) : (
            <>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
            </>
          )}
        </div>

        {!end && (
          <div className={styles.arrowsContainer}>
            {i > 0 && (
              <IonIcon icon={arrowBackOutline} className={styles.arrowLeft} />
            )}
            {i < length && (
              <IonIcon
                icon={arrowForwardOutline}
                className={styles.arrowRight}
              />
            )}
          </div>
        )}
      </div>
    </IonSlide>
  );
};

export default Slide;
