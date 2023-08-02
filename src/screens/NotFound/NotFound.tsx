import { IonPage } from "@ionic/react";

import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";

export const NotFound = () => {
  useDocumentTitleApp("¡Ups! Página no encontrada 😢");

  return (
    <IonPage className="animate__animated animate__screenInUp">
      <div className="animate__animated animate__fadeIn">
        <h1>Página no encontrada</h1>
      </div>
    </IonPage>
  );
};
