import React, { useEffect, useState } from "react";

// Styles
import styles from "./Toggle.module.css";

interface ContainerProps {
  float?: boolean;
}

const Toggle: React.FC<ContainerProps> = ({ float = false }) => {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const darkMode: any = localStorage.getItem("darkMode");
    if (darkMode === "true") setToggle(false);
  }, []);

  const handleToggleDarkMode = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "true");
      setToggle(false);
    } else {
      localStorage.setItem("darkMode", "false");
      setToggle(true);
    }
  };

  return (
    <div className={`${float && styles.float}`}>
      <input
        id="toggle"
        className={styles.toggle}
        type="checkbox"
        checked={toggle}
        onChange={handleToggleDarkMode}
      />
    </div>
  );
};

export default Toggle;
