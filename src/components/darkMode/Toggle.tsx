import React from "react";

// Styles
import styles from "./Toggle.module.css";

// Hooks
import useDarkmode from "../../hooks/useDarkmode";

interface ContainerProps {
  float?: boolean;
  activePrimary?: boolean;
}

const Toggle: React.FC<ContainerProps> = ({
  float = false,
  activePrimary = false,
}) => {
  const { darkMode, toggleDarkMode } = useDarkmode();

  return (
    <div className={`${float && styles.float}`}>
      <input
        id="toggle"
        className={`${styles.toggle} ${
          activePrimary ? styles.primary_color : styles.white_color
        }`}
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};

export default Toggle;
