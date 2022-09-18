import styles from "./Loaders.module.css";

export const Spinner: React.FC = () => (
  <span>
    <span className={styles.spinnerDot} />
    <span className={styles.spinnerDot} />
    <span className={styles.spinnerDot} />
  </span>
);
