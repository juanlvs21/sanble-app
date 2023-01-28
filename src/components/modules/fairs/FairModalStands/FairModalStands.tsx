import { Button } from "@/components/common/buttons/Button";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { TStand } from "@/types/TStand";

export type ComponentProps = {
  /**
   * Stands list
   */
  stands?: TStand[];
  /**
   * Trigger open modal
   */
  trigger?: string;
  /**
   * Custom className component
   */
  className?: string;
  /**
   * Component Loading
   */
  isLoading?: boolean;
};

export const FairModalStands = ({
  stands,
  isLoading,
  trigger,
  className = "",
}: ComponentProps) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal ref={modalRef} trigger={trigger} className={className}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <Button
              onClick={() => modalRef.current?.dismiss()}
              fill="clear"
              color="medium"
            >
              <AiOutlineClose size={24} />
            </Button>
          </IonButtons>
          <IonTitle>Stands Participantes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Stands list </h1>
      </IonContent>
    </IonModal>
  );
};
