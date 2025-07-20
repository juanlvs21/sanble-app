import {
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { EmptyAlert } from "@/components/common/EmptyAlert";
import { Fetcher } from "@/components/common/Fetcher";
import { HeaderModal } from "@/components/common/HeaderModal";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { FairCardList } from "@/components/modules/fairs/FairCardList";
import { useModalGoBack } from "@/hooks/useModalGoBack";
import { TFair } from "@/types/TFair";
import styles from "./StandModalFairs.module.css";
import { useStandRemoveFair } from "@/hooks/stands/useStandRemoveFair";
import { useUser } from "@/hooks/useUser";
import { TStand } from "@/types/TStand";

export type ComponentProps = {
  stand?: TStand;
  /**
   * Fairs list
   */
  fairs: TFair[];
  /**
   * Handle refresh get more Fairs
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

export const StandModalFairs = ({
  stand,
  fairs,
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

  const { handleRemove } = useStandRemoveFair({
    standID: stand?.id || "",
    handleRefresh,
  });

  const isOwner = user?.uid === stand?.owner?.uid;

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
          <IonTitle>Ferias donde encontrarme</IonTitle>
        </IonToolbar>
      </HeaderModal>
      <IonContent>
        <Fetcher
          handleRefresh={handleRefresh}
          classNameContent={styles.standFairsModalFetcherContent}
          classNameSection={styles.standFairsModalFetcherSection}
          classNameRefresh={styles.standFairsModalRefresh}
        >
          <>
            {!fairs.length && !isLoading ? (
              <EmptyAlert message={`No hay Ferias donde participe`} />
            ) : (
              <div className="dataListContainer col-1">
                {isLoading && !fairs.length
                  ? Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton
                          key={i}
                          height={130}
                          className={styles.standFairsCardSkeleton}
                        />
                      ))
                  : fairs.map((fair) => (
                      <FairCardList
                        key={fair.id}
                        fair={fair}
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
