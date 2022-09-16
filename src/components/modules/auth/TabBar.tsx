import { useMatch, useNavigate } from "react-router-dom";

import styles from "./TabBar.module.css";

const TabBar: React.FC = () => {
  const matchSignup = useMatch("/app/sesion/registrar");
  const navigate = useNavigate();

  return (
    <nav className={styles.tabBarContiner}>
      <div className={styles.barContainer}>
        <div
          className={`${styles.barFill} ${
            matchSignup ? styles.barFillRight : ""
          }`}
        />
      </div>
    </nav>
  );
};

export default TabBar;
