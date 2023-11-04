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
import { useFairInviteStand } from "@/hooks/fairs/invitations/useFairInviteStand";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./RequestToFairMyStandModal.module.css";

export type ComponentProps = {
  /**
   * Stand id
   */
  standID: string;
};

export const RequestToFairMyStandModal = ({ standID }: ComponentProps) => {
  const { value: showModal, toggle: toggleModal } = useBoolean();

  const {
    fairs,
    handleRefresh,
    handleLoadMore,
    isLoading,
    isLoadingMore,
    showLoadMoreBtn,
  } = useFairInviteStand(standID);

  return (
    <>
      <div
        className={`${styles.inviteBtnContainer} animate__animated animate__fadeIn`}
        onClick={toggleModal}
      >
        <Button color="secondary">Solicitar unir mi Stand</Button>
      </div>

      <IonModal isOpen={showModal}>
        <HeaderModal>
          <IonToolbar>
            <IonTitle>Solicitar unir mi Stand</IonTitle>
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
                <EmptyAlert message={`No tienes ferias creadas`} />
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
