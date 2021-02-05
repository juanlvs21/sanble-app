import React, { useEffect } from "react";

// Styles
import styles from "./Preload.module.css";

// Image
import Logo from "../../assets/images/Solo_Logo_Light.png";

// Hooks
import useApp from "../../hooks/useApp";

const PreloadScreen: React.FC = () => {
  const { setOverlays } = useApp();

  useEffect(() => {
    setOverlays(true);
    return () => {
      setOverlays(false);
    };
  }, [setOverlays]);

  return (
    <div className={styles.background}>
      <img src={Logo} alt="Sanble Loading" className={styles.logo} />
    </div>
  );
};

export default PreloadScreen;
