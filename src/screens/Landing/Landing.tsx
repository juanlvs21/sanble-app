import { IonPage } from "@ionic/react";
import { Link, RouteComponentProps } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLanding } from "@/hooks/useLanding";
import styles from "./Landing.module.css";

type TPageProps = RouteComponentProps<{}>;

export const Landing: React.FC<TPageProps> = () => {
  const { handleGetDownloadAppLink } = useLanding();
  useDocumentTitle("¡Bienvenido! 🎉");

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
            {/* <a href="/app"> */}
            <Link to="/app">
              <Button color="secondary" className={styles.btn}>
                Ir a la aplicación
              </Button>
            </Link>
            {/* </a> */}

            <Button
              onClick={handleGetDownloadAppLink}
              color="secondary"
              fill="outline"
              className={styles.btn}
            >
              Descargar Android
            </Button>
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
