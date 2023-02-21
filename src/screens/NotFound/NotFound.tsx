import { IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type TPageProps = RouteComponentProps<{}>;

export const NotFound: React.FC<TPageProps> = () => {
  useDocumentTitle("¡Ups! Página no encontrada 😢");

  return (
    <IonPage className="animate__animated animate__screenInUp">
      <div className="animate__animated animate__fadeIn">
        <h1>Página no encontrada</h1>
      </div>
    </IonPage>
  );
};
