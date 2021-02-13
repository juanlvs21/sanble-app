import React from "react";
import { IonAlert } from "@ionic/react";

interface ContainerProps {
  show: boolean;
  handleCancel: any;
  handleOk: any;
}

const ModalLogout: React.FC<ContainerProps> = ({
  show,
  handleCancel,
  handleOk,
}) => (
  <IonAlert
    isOpen={show}
    onDidDismiss={handleCancel}
    header={"Cerrar Sesión"}
    message={"¿Estás seguro que deseas cerrar sesión?"}
    buttons={[
      {
        text: "Cancelar",
        role: "cancel",
        cssClass: "secondary",
      },
      {
        text: "Cerrar sesión",
        handler: handleOk,
      },
    ]}
  />
);

export default ModalLogout;
