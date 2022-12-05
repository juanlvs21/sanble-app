import { Button } from "@/components/common/buttons/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLanding } from "@/hooks/useLanding";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export type ComponentProps = {
  /**
   * CSS transition className
   */
  transitionStage: string;
  /**
   * Function to set transitionStage
   */
  onAnimationEnd: () => void;
};

export const Landing: React.FC<ComponentProps> = ({
  onAnimationEnd,
  transitionStage,
}) => {
  const { handleGetDownloadAppLink } = useLanding();
  useDocumentTitle("¡Bienvenido! 🎉");

  return (
    <main
      className={`${styles.landingContainer} animate__animated animate__fadeIn`}
    >
      <section className={transitionStage} onAnimationEnd={onAnimationEnd}>
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
          <Link to="/app" replace>
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
  );
};
