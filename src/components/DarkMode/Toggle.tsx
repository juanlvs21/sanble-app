import React, { useContext } from "react";

// Styles
import styles from "./Toggle.module.css";

// Context
import { DataContext } from "../../context/AppContext";

interface ContainerProps {
  float?: boolean;
}

const Toggle: React.FC<ContainerProps> = ({ float = false }) => {
  const { darkMode } = useContext(DataContext);

  return (
    <div className={`${float && styles.float}`}>
      <input
        id="toggle"
        className={styles.toggle}
        type="checkbox"
        checked={darkMode.toggle}
        onChange={darkMode.toggleDarkMode}
      />
    </div>
  );
};

export default Toggle;
