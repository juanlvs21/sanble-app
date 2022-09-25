import { Link } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { useLanding } from "@/hooks/useLanding";
import styles from "./Landing.module.css";

export const Landing: React.FC = () => {
  const { handleGetDownloadAppLink } = useLanding();

  return (
    <main className={styles.landingContainer}>
      <img
        src="/assets/images/logo-full-white.png"
        alt="Sanble"
        className={styles.logo}
      />
      <h1 className={styles.phrase}>
        Unidos al crearlo, para unirlos al usarlo
      </h1>

      <div className={styles.btnContainer}>
        <Link to="/app">
          <Button color="secondary" className={styles.btn}>
            Ir a la aplicación
          </Button>
        </Link>

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
    </main>
  );
};
