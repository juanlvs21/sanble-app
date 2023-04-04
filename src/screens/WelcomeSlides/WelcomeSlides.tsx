import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperProps, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";

import { Button } from "@/components/common/buttons/Button";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { setStorage } from "@/helpers/storage";
import { StorageHideMobileWelcomeKey } from "@/helpers/storageKeys";
import { useApp } from "@/hooks/useApp";
import { useUser } from "@/hooks/useUser";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./WelcomeSlides.module.css";

const slideOpts: SwiperProps = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 0,
};

type TWelcomeSlide = {
  bg: string;
  img: string;
  title: string;
  description?: string;
  actions: React.ReactElement;
};

export const WelcomeSlides = () => {
  const navigate = useNavigate();
  const { hideMobileWelcome } = useApp();
  const { user } = useUser();
  const slideRef = useRef<SwiperRef>(null);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hideMobileWelcome) {
      if (user) navigate(ERoutesName.APP, { replace: true });
      else navigate(ERoutesName.SESSION_SIGNUP, { replace: true });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleGoSignup = async () => {
    await setStorage(StorageHideMobileWelcomeKey, true);

    if (user) navigate(ERoutesName.APP, { replace: true });
    else navigate(ERoutesName.SESSION_SIGNUP, { replace: true });
  };

  const onBtnClicked = async (direction: "next" | "prev") => {
    if (direction === "next") {
      slideRef.current?.swiper.slideNext();
    } else if (direction === "prev") {
      slideRef.current?.swiper.slidePrev();
    }
  };

  const items = useMemo<TWelcomeSlide[]>(
    () => [
      {
        bg: "welcomeBg1",
        img: "welcomeIlustration1",
        title: "Bienvenido",
        description:
          "¿Estás listo para vivir tus ferias favoritas de una manera más cercana a ti?",
        actions: (
          <div className={styles.slidesWelcomeStart}>
            <span>Deliza para ver más</span>
            <MdKeyboardArrowRight size={20} color="#232020a1" />
            <MdKeyboardArrowRight size={30} color="#232020" />
          </div>
        ),
      },
      {
        bg: "welcomeBg2",
        img: "welcomeIlustration2",
        title: "Disfruta lo mejor",
        description:
          "Las Ferias y Stands más populares, y además, ¡tú mismo puedes dar tu opinión sobre ellos!",
        actions: (
          <Button
            color="secondary"
            expand="block"
            onClick={() => onBtnClicked("next")}
          >
            Ver más
          </Button>
        ),
      },
      {
        bg: "welcomeBg3",
        img: "welcomeIlustration3",
        title: "Encuéntralas",
        description:
          "Encuentra las Ferias que más te gusten y los Stands más llamativos en cualquier lugar",
        actions: (
          <Button
            color="primary"
            expand="block"
            onClick={() => onBtnClicked("next")}
          >
            Ya casi
          </Button>
        ),
      },
      {
        bg: "welcomeBg4",
        img: "welcomeIlustration4",
        title: "¡Emprende!",
        description:
          "Crea tu propio Stand o incluso ¡Tu Feria! Y luego mira lo que la gente piensa de ellos",
        actions: (
          <Button
            color="secondary"
            expand="block"
            onClick={() => onBtnClicked("next")}
          >
            Y ahora...
          </Button>
        ),
      },
      {
        bg: "welcomeBg5",
        img: "welcomeIlustration5",
        title: "¿Bueno, qué estás esperando?",

        actions: (
          <Button color="primary" expand="block" onClick={handleGoSignup}>
            Registrarse
          </Button>
        ),
      },
    ],
    []
  );

  const onActiveChange = async (event: any) => {
    setActive(event.activeIndex + 1);
  };

  return isLoading ? (
    <SpinnerFullScreen show />
  ) : (
    <IonPage className="animate__animated animate__fadeIn">
      <IonContent className={styles.slidesWelcomeContent} fullscreen>
        {active > 1 && (
          <Button
            color="primary"
            onClick={() => onBtnClicked("prev")}
            className={`${styles.slidesWelcomePrev} animate__animated animate__zoomIn`}
          >
            <IoIosArrowBack size={24} />
          </Button>
        )}
        <Swiper
          ref={slideRef}
          className={styles.slidesWelcomeContainer}
          onActiveIndexChange={onActiveChange}
          {...slideOpts}
        >
          {items.map((item, i) => (
            <SwiperSlide
              key={i}
              className={`${styles.slideWelcomeDataContent} animate__animated animate__fadeIn`}
              style={{
                backgroundImage: `url("/assets/images/welcome/${item.bg}.svg")`,
              }}
            >
              <section className={styles.slideWelcomeImgContainer}>
                <img
                  src={`/assets/images/welcome/${item.img}.svg`}
                  className="animate__animated animate__zoomIn"
                />
              </section>
              <section
                className={`${styles.slideWelcomeDescriptionContainer} animate__animated animate__fadeIn`}
              >
                <h1 className={`${!item.description ? styles.onlyTitle : ""}`}>
                  {item.title}
                </h1>
                <p>{item.description}</p>
                <div className={styles.slideWelcomeActions}>{item.actions}</div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`${styles.slidesWelcomeProgress} animate__animated animate__slideInUp`}
        >
          <div style={{ width: `${(active / items.length) * 100}%` }} />
        </div>
      </IonContent>
    </IonPage>
  );
};
