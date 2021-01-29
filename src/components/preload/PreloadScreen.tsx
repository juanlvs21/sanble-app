import React from "react";

// Styles
import styles from "./Preload.module.css";

// Image
import Logo from "../../assets/images/Solo_Logo_Light.png";

const PreloadScreen: React.FC = () => {
  return (
    <div className={styles.background}>
      <img src={Logo} alt="Sanble Loading" className={styles.logo} />
    </div>
  );
};

export default PreloadScreen;
