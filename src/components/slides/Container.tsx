import React, { useEffect } from "react";
import { IonSlides, IonContent } from "@ionic/react";

// Components
import Slide from "./Slide";

// Images
import onlineStore from "../../assets/images/slides/online-store.png";
import rating from "../../assets/images/slides/rating.png";
import tracking from "../../assets/images/slides/tracking.png";
import deliveryCourier from "../../assets/images/slides/delivery-courier.png";
import timer from "../../assets/images/slides/timer.png";

// Hooks
import useApp from "../../hooks/useApp";

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const SlidesContainer: React.FC = () => {
  const { setOverlays } = useApp();

  useEffect(() => {
    setOverlays(true);
    return () => setOverlays(false);
  }, []);

  const slides = [
    {
      backgroundColor: "#FF7315",
      image: onlineStore,
      title: "¡Bienvenido a Sanble",
      description:
        "¿Preparado para experimentar tus ferias favoritas de una manera más inteligente, más intuitiva y mucho mas cercana a ti",
      end: false,
    },
    {
      backgroundColor: "#FFCC80",
      image: rating,
      title: "Encuentra lo mejor",
      description:
        "Mira las ferias más populares y los Stands con mejor puntuación, además, ¡Expresate!, y danos tu opinión acerca de las ferias y Stands que visites",
      end: false,
    },
    {
      backgroundColor: "#3A3535",
      image: tracking,
      title: "¡Localizalas!",
      description:
        "Encuentra las ferias que más te llamen la atención y los Stands que más te gusten desde cualquier parte que desees",
      end: false,
    },
    {
      backgroundColor: "#FFCC80",
      image: deliveryCourier,
      title: "¡Emprende!",
      description:
        "Crea con nuestra ayuda tu propio Stand o ¡hasta tu propia feria!, y luego observa una manera muy sencilla lo que las personas opinan acerca de ellos",
      end: false,
    },
    {
      backgroundColor: "#FF7315",
      image: timer,
      title: "Y bien... ¿Qué esperas?",
      description: "¡Vamos!",
      end: true,
    },
  ];

  return (
    <IonContent>
      <IonSlides
        pager={true}
        options={slideOpts}
        onIonSlideDidChange={() => console.log("Change")}
      >
        {slides.map((data, i) => (
          <Slide {...data} key={i} />
        ))}
      </IonSlides>
    </IonContent>
  );
};

export default SlidesContainer;
