import React from "react";

// Styles
import styles from "./Toggle.module.css";

// Hooks
import useDarkmode from "../../hooks/useDarkmode";

interface ContainerProps {
  float?: boolean;
}

const Toggle: React.FC<ContainerProps> = ({ float = false }) => {
  const { darkMode, toggleDarkMode } = useDarkmode();

  return (
    <div className={`${float && styles.float}`}>
      <input
        id="toggle"
        className={styles.toggle}
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};

export default Toggle;
