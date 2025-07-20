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
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { useFairRemoveStand } from "@/hooks/fairs/useFairRemoveStand";
import { TFair } from "@/types/TFair";
import { useUser } from "@/hooks/useUser";

export type ComponentProps = {
  fair?: TFair;
  /**
   * Stands list
   */
  stands: TStand[];
  /**
   * Handle refresh get more Stands
   */
  handleRefresh: () => Promise<any>;
  /**
   * Load more data
   */
  handleLoadMore?: () => Promise<void>;
  /**
   * Trigger open modal
   */
  trigger?: string;
  /**
   * Show button load more
   */
  showLoadMoreBtn?: boolean;
  /**
   * Component Loading
   */
  isLoading?: boolean;
  /**
   * Is loading more
   */
  isLoadingMore?: boolean;
  /**
   * Custom className component
   */
  className?: string;
};

export const FairModalStands = ({
  fair,
  stands,
  trigger,
  isLoading,
  isLoadingMore,
  showLoadMoreBtn,
  className = "",
  handleRefresh,
  handleLoadMore,
}: ComponentProps) => {
  const { user } = useUser();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => modalRef.current?.dismiss();

  useModalGoBack(isOpen, handleDismiss);

  const { handleRemove } = useFairRemoveStand({
    fairID: fair?.id || "",
    handleRefresh,
  });

  const isOwner = user?.uid === fair?.owner?.uid;

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
        <Fetcher
          handleRefresh={handleRefresh}
          classNameContent={styles.fairStandsModalFetcherContent}
          classNameSection={styles.fairStandsModalFetcherSection}
          classNameRefresh={styles.fairStandsModalRefresh}
        >
          <>
            {!stands.length && !isLoading ? (
              <EmptyAlert message={`No hay Stands participantes`} />
            ) : (
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
                      <StandCardList
                        key={stand.id}
                        stand={stand}
                        handleRemove={isOwner ? handleRemove : undefined}
                      />
                    ))}
              </div>
            )}

            {showLoadMoreBtn && (
              <ButtonLoadMore
                handleLoadMore={handleLoadMore}
                isLoading={isLoadingMore}
              />
            )}
          </>
        </Fetcher>
      </IonContent>
    </IonModal>
  );
};
