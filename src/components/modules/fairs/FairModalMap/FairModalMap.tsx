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
import { TbMapOff } from "react-icons/tb";

import { Map } from "@/components/modules/geolocation/Map";
import { EColors } from "@/helpers/colors";
import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useStatusBar } from "@/hooks/useStatusBar";
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
  const { backgroundStatusBar } = useStatusBar();
  const modalMap = useRef<HTMLIonModalElement>(null);

  const handleWillPresent = () => backgroundStatusBar(EColors.WHITE);
  const handleWillDismiss = () => backgroundStatusBar(EColors.PRIMARY);

  return (
    <IonModal
      ref={modalMap}
      trigger={trigger}
      className={className}
      onIonModalWillPresent={handleWillPresent}
      onIonModalWillDismiss={handleWillDismiss}
    >
      <IonHeader>
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
        {fair?.geopoint ? (
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
          />
        ) : (
          <div className={styles.fairModalMapNoGeopoint}>
            <TbMapOff size={62} />
            <h4>{`${
              fair?.name || "Esta Feria"
            } no posee ubicación geográfica`}</h4>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};
