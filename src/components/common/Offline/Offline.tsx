import { Spinner } from "@/components/common/loaders/Spinner";
import styles from "./Offline.module.css";

export const Offline = () => {
  return (
    <section
      className={`${styles.offLineSection} animate__animated animate__fadeIn`}
    >
      <Spinner className={styles.spinner} size={70} color="light" />
      <span>Reconectando...</span>
      <small>Has perdido tu conexión a internet</small>
    </section>
  );
};
