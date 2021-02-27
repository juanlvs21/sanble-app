import React from "react";
import { IonButton } from "@ionic/react";

// Layouts
import Layout from "../../layouts/Auth";

const Welcome: React.FC = () => {
  return (
    <Layout compact={true}>
      <div className="text_center">
        <h1>
          ¡Gracias por unirte a <b>Sanble</b>!
        </h1>

        <p>
          Hemos enviado un mensaje de confirmación a tu dirección de correo
          electrónico.
        </p>

        <IonButton
          expand="block"
          color="primary"
          fill="outline"
          routerLink="/auth/login"
        >
          Iniciar Sesión
        </IonButton>
      </div>
    </Layout>
  );
};

export default Welcome;
