import {
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AiOutlineClose } from "react-icons/ai";
import { useBoolean } from "usehooks-ts";

import { EmptyAlert } from "@/components/common/EmptyAlert";
import { Fetcher } from "@/components/common/Fetcher";
import { HeaderModal } from "@/components/common/HeaderModal";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { InvitationCard } from "@/components/modules/invitations/InvitationCard";
import { useStandRequestFair } from "@/hooks/fairs/invitations/useStandRequestFair";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./InviteToMyFairModal.module.css";

export type ComponentProps = {
  /**
   * Fair id
   */
  fairID: string;
};

export const InviteToMyFairModal = ({ fairID }: ComponentProps) => {
  const { value: showModal, toggle: toggleModal } = useBoolean();

  const {
    stands,
    handleRefresh,
    handleLoadMore,
    isLoading,
    isLoadingMore,
    showLoadMoreBtn,
  } = useStandRequestFair(fairID);

  return (
    <>
      <div
        className={`${styles.inviteBtnContainer} animate__animated animate__fadeIn`}
        onClick={toggleModal}
      >
        <Button color="secondary">Invitar a mis Ferias</Button>
      </div>

      <IonModal isOpen={showModal}>
        <HeaderModal>
          <IonToolbar>
            <IonTitle>Invitar a mis Ferias</IonTitle>
            <IonButtons slot="end">
              <Button
                onClick={() => toggleModal()}
                fill="clear"
                color="medium"
                className={styles.productFormModalClose}
              >
                <AiOutlineClose size={24} />
              </Button>
            </IonButtons>
          </IonToolbar>
        </HeaderModal>
        <IonContent>
          <Fetcher
            handleRefresh={handleRefresh}
            classNameSection={styles.inviteModalSectionFetcher}
          >
            <>
              {!stands.length && !isLoading ? (
                <EmptyAlert message={`No tienes stands creados`} />
              ) : (
                <div className="dataListContainer col-1">
                  {isLoading && !stands.length
                    ? Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton
                            key={i}
                            height={130}
                            className={styles.standFairsCardSkeleton}
                          />
                        ))
                    : stands.map((stand) => (
                        <InvitationCard
                          key={stand.id}
                          stand={stand}
                          goBackUrl={`${ERoutesName.FAIRS_LIST}/${fairID}`}
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
    </>
  );
};
