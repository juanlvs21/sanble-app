import React, { useEffect } from "react";
import { IonIcon, IonButton } from "@ionic/react";
import { closeCircleOutline, checkmarkCircleOutline } from "ionicons/icons";
import { useLocation } from "react-router-dom";

// Layouts
import Layout from "../../layouts/Auth";

// Styles
import styles from "./Activate.module.css";

// Components
import PreloadScreen from "../../components/preload/PreloadScreen";

// Hooks
import useAccount from "../../hooks/useAccount";

const Welcome: React.FC = () => {
  const location = useLocation();

  const { loading, active, handleActivateAccount } = useAccount();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    handleActivateAccount(query.get("token") || "");
  }, []); // eslint-disable-line

  if (loading) return <PreloadScreen />;
  else
    return (
      <Layout compact={true}>
        <section className={styles.container}>
          <span>¡Bienvenido a Sanble!</span>
          <h1 className={styles.title}>Activación de Cuenta</h1>

          {active ? (
            <>
              <IonIcon
                icon={checkmarkCircleOutline}
                className={styles.icon}
                color="success"
              />
              <h3 className={styles.title}>
                <b>¡Felicidades!</b> <br />
                Cuenta activada satisfactoriamente
              </h3>
              <IonButton
                expand="block"
                color="primary"
                fill="outline"
                routerLink="/"
                className={styles.btn}
              >
                Ir al inicio
              </IonButton>
            </>
          ) : (
            <>
              <IonIcon
                icon={closeCircleOutline}
                className={styles.icon}
                color="danger"
              />
              <h3 className={styles.title}>
                <b>¡Error!</b> <br />
                Token de activación es inválido o ya fue usado
              </h3>
            </>
          )}
        </section>
      </Layout>
    );
};

export default Welcome;
