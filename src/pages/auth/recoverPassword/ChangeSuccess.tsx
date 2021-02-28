import React from "react";
import { IonButton } from "@ionic/react";

// Layouts
import Layout from "../../../layouts/Auth";

const ChangeSuccess: React.FC = () => {
  return (
    <Layout compact={true}>
      <div className="text_center">
        <h1>Contraseña Restablecida Satisfactoriamente</h1>

        <p>
          Puede seguir disfrutando de su experiencia en <b>Sanble</b>.
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

export default ChangeSuccess;
