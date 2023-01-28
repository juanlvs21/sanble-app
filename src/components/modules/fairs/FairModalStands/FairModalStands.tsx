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

import { Button } from "@/components/common/buttons/Button";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { StandCardList } from "@/components/modules/stands/StandCardList";
import { TStand } from "@/types/TStand";
import styles from "./FairModalStands.module.css";

export type ComponentProps = {
  /**
   * Stands list
   */
  stands: TStand[];
  /**
   * Handle refresh get more Stands
   */
  handleRefresh: () => Promise<any>;
  /**
   * Handle infinite scroll get more Stands
   */
  handleInfinite: () => Promise<any>;
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
  handleRefresh,
  handleInfinite,
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
        <Fetcher
          handleRefresh={handleRefresh}
          handleInfiniteScroll={handleInfinite}
          classNameContent={styles.fairStandsModalFetcher}
          classNameRefresh={styles.fairStandsModalRefresh}
        >
          <div className="dataListContainer">
            {isLoading && !stands.length
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      height={130}
                      className={styles.fairStandsCardSkeleton}
                    />
                  ))
              : stands.map((stand) => (
                  <StandCardList key={stand.id} stand={stand} />
                ))}
          </div>
        </Fetcher>
      </IonContent>
    </IonModal>
  );
};
