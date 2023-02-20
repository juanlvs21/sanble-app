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
import { EmptyAlert } from "@/components/common/EmptyAlert";
import { Fetcher } from "@/components/common/Fetcher";
import { HeaderModal } from "@/components/common/HeaderModal";
import { Skeleton } from "@/components/common/Skeleton";
import { StandCardList } from "@/components/modules/stands/StandCardList";
import { useModalGoBack } from "@/hooks/useModalGoBack";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => modalRef.current?.dismiss();

  useModalGoBack(isOpen, handleDismiss);

  return (
    <IonModal
      ref={modalRef}
      trigger={trigger}
      className={className}
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
          <IonTitle>Stands Participantes</IonTitle>
        </IonToolbar>
      </HeaderModal>
      <IonContent>
        {!stands.length && !isLoading ? (
          <EmptyAlert message={`No hay Stands participantes`} />
        ) : (
          <Fetcher
            handleRefresh={handleRefresh}
            handleInfiniteScroll={handleInfinite}
            classNameContent={styles.fairStandsModalFetcherContent}
            classNameSection={styles.fairStandsModalFetcherSection}
            classNameRefresh={styles.fairStandsModalRefresh}
          >
            <div className="dataListContainer col-1">
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
        )}
      </IonContent>
    </IonModal>
  );
};
