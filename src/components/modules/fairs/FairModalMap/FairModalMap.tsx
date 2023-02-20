import {
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "@/components/common/buttons/Button";
import { HeaderModal } from "@/components/common/HeaderModal";
import { Map } from "@/components/modules/geolocation/Map";
import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useModalGoBack } from "@/hooks/useModalGoBack";
import { TFair } from "@/types/TFair";
import styles from "./FairModalMap.module.css";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair?: TFair;
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

export const FairModalMap = ({
  fair,
  isLoading,
  trigger,
  className = "",
}: ComponentProps) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => modalRef.current?.dismiss();

  useModalGoBack(isOpen, handleDismiss);

  return (
    <IonModal
      ref={modalRef}
      trigger={trigger}
      className={`${styles.fairMapModal} ${className}`}
      onWillPresent={() => setIsOpen(true)}
      onWillDismiss={() => setIsOpen(false)}
    >
      <HeaderModal>
        <IonToolbar>
          <IonButtons slot="end">
            <Button onClick={handleDismiss} fill="clear" color="medium">
              <AiOutlineClose size={24} />
            </Button>
          </IonButtons>
          <IonTitle>Ubicación</IonTitle>
        </IonToolbar>
      </HeaderModal>
      <IonContent>
        {fair && (
          <Map
            center={fair.geopoint}
            markers={formatFairsMarks([
              {
                id: fair.id,
                name: fair.name,
                geopoint: fair.geopoint,
                stars: fair.stars,
                type: fair.type,
              },
            ])}
            isLoading={isLoading}
            errorMsg={
              !fair?.geopoint
                ? `${fair?.name || "Esta Feria"} no posee ubicación geográfica`
                : undefined
            }
          />
        )}
      </IonContent>
    </IonModal>
  );
};
