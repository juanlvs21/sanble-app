import styles from "./Splash.module.css";

export const Splash: React.FC = () => (
  <div className={styles.splashContainer}>
    <img src="/logo.svg" alt="Sanble" className={styles.splashLogo} />
    <h3 className={styles.splashSubtitle}>Bienvenido</h3>
    <h1 className={styles.splashTitle}>Sanble</h1>
    <div className={styles.splashOcean}>
      <div className={styles.splashWave} />
      <div className={styles.splashWave} />
    </div>
  </div>
);
