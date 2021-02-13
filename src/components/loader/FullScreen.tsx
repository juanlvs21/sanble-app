import React, { useEffect } from "react";

// Styles
import styles from "./Loader.module.css";

// Image
import LogoWhite from "../../assets/images/Solo_Logo_Light.png";
import LogoOrange from "../../assets/images/Solo_Logo.png";

// Hooks
import useApp from "../../hooks/useApp";

interface ContainerProps {
  overlays?: boolean;
  withBg?: boolean;
}

const FullScreen: React.FC<ContainerProps> = ({
  overlays = false,
  withBg = true,
}) => {
  const { setOverlays } = useApp();

  useEffect(() => {
    if (overlays) setOverlays(true);
    return () => setOverlays(false);
  }, [setOverlays, overlays]);

  return (
    <div
      className={`${styles.background} ${
        withBg ? styles.withBg : styles.unfilled
      }`}
    >
      <img
        src={withBg ? LogoWhite : LogoOrange}
        alt="Sanble Loading"
        className={styles.logo}
      />
    </div>
  );
};

export default FullScreen;
