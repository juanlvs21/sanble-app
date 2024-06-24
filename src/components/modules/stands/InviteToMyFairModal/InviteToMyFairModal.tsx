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
import { useInvitationListMyFairs } from "@/hooks/invitations/useInvitationListMyFairs";
import { useInvitationSend } from "@/hooks/invitations/useInvitationSend";
import { EInvitationType } from "@/types/TInvitation";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./InviteToMyFairModal.module.css";

export type ComponentProps = {
  /**
   * Stand id
   */
  standID: string;
  /**
   * Owner uid
   */
  standOwnerUid: string;
};

export const InviteToMyFairModal = ({
  standID,
  standOwnerUid,
}: ComponentProps) => {
  const { value: showModal, toggle: toggleModal } = useBoolean();

  const {
    fairs,
    handleRefresh,
    handleLoadMore,
    isLoading,
    isLoadingMore,
    showLoadMoreBtn,
  } = useInvitationListMyFairs(standID);

  const { handleSendInvitation } = useInvitationSend(handleRefresh);

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
              {!fairs.length && !isLoading ? (
                <EmptyAlert message={`No tienes ferias creados`} />
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
                        <InvitationCard
                          key={fair.id}
                          fair={fair}
                          goBackUrl={`${ERoutesName.STANDS_LIST}/${standID}`}
                          handleSendInvitation={() =>
                            handleSendInvitation({
                              standID,
                              fairID: fair.id,
                              sentTo: standOwnerUid,
                              type: EInvitationType.STAND_INVITATION,
                            })
                          }
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
