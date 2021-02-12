import React from "react";
import { IonSlide, IonButton } from "@ionic/react";

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
}

const Slide: React.FC<ContainerProps> = ({
  backgroundColor,
  title,
  description,
  image,
  end,
}) => {
  const { setWelcome } = useApp();

  const goLogin = () => setWelcome(false);

  return (
    <IonSlide className={styles.slide}>
      <div className={styles.container} style={{ backgroundColor }}>
        <img className={styles.image} src={image} alt={title} />

        {end ? (
          <>
            <p className={styles.description}>{title}</p>
            <h1 className={styles.title}>{description}</h1>
            <IonButton
              expand="block"
              color="dark"
              className={styles.btn}
              onClick={goLogin}
            >
              Comenzar
            </IonButton>
          </>
        ) : (
          <>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
          </>
        )}
      </div>
    </IonSlide>
  );
};

export default Slide;
