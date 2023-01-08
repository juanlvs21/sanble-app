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

import { Map } from "@/components/modules/geolocation/Map";
import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useApp } from "@/hooks/useApp";
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

export const FairModalMap: React.FC<ComponentProps> = ({
  fair,
  isLoading,
  trigger,
  className = "",
}) => {
  const { isCapacitor } = useApp();
  const modalMap = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal ref={modalMap} trigger={trigger} className={className}>
      <IonHeader
        className={` ${styles.fairMapHeader} ${
          isCapacitor ? styles.isCapacitor : ""
        }`}
      >
        <IonToolbar>
          <IonButtons slot="end">
            <Button
              onClick={() => modalMap.current?.dismiss()}
              fill="clear"
              color="medium"
            >
              <AiOutlineClose size={24} />
            </Button>
          </IonButtons>
          <IonTitle>Ubicación</IonTitle>
        </IonToolbar>
      </IonHeader>
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
