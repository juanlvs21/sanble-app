import React from "react";
import { IonPage, IonContent } from "@ionic/react";

// Styles
import styles from "./Auth.module.css";

// Image
import Logo from "../assets/images/Logo_Light.png";
import LogoHorizontal from "../assets/images/Logo_Horizontal_Light.png";

// Components
import ToggleDarkMode from "../components/DarkMode/Toggle";

interface ContainerProps {
  children: React.ReactNode;
  compact?: boolean;
}

const Auth: React.FC<ContainerProps> = ({ children, compact = false }) => {
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

export default Auth;
