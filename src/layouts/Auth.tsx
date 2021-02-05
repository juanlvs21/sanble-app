import React, { useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";

// Styles
import styles from "./Auth.module.css";

// Image
import Logo from "../assets/images/Logo_Light.png";
import LogoHorizontal from "../assets/images/Logo_Horizontal_Light.png";

// Components
import ToggleDarkMode from "../components/darkMode/Toggle";

// Hooks
import useApp from "../hooks/useApp";

interface ContainerProps {
  children: React.ReactNode;
  compact?: boolean;
}

const AuthLayout: React.FC<ContainerProps> = ({
  children,
  compact = false,
}) => {
  const { setColorStatusBar } = useApp();

  useEffect(() => {
    setColorStatusBar("#ff7315");
  }, [setColorStatusBar]);

  return (
    <IonPage>
      <IonContent className={styles.ion_content}>
        <section className={styles.container}>
          <ToggleDarkMode float={true} />
          <div className={styles.card}>
            <div
              className={`${styles.logo_container} ${
                compact && styles.logo_container_compact
              }`}
            >
              <img src={compact ? LogoHorizontal : Logo} alt="SANBLE" />
            </div>
            <main className={styles.main}>{children}</main>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default AuthLayout;
