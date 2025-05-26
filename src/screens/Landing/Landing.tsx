import { IonPage } from "@ionic/react";
import { Link } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./Landing.module.css";

export const Landing = () => {
  useDocumentTitleApp("¡Bienvenido! 🎉");

  return (
    <IonPage>
      <main
        className={`${styles.landingContainer} animate__animated animate__fadeIn`}
      >
        <section>
          <img
            src="/assets/images/logo-full-white.png"
            alt="Sanble"
            className={styles.logo}
          />
          <h1 className={styles.phrase}>
            Unidos al crearlo, para unirlos al usarlo
          </h1>

          <div className={styles.btnContainer}>
            <Link to={ERoutesName.APP}>
              <Button color="secondary" className={styles.btn}>
                Ir a la aplicación
              </Button>
            </Link>

            <a
              href="https://staticsanble.juanl.dev/downloads/sanble.apk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="secondary" fill="outline" className={styles.btn}>
                Descargar Android
              </Button>
            </a>
          </div>

          <img
            className={styles.previewImg}
            src="/assets/images/landing/preview.png"
            alt="Preview Sanble"
          />
        </section>
      </main>
    </IonPage>
  );
};
