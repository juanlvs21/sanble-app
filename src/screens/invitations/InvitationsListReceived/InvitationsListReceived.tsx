import { EmptyList } from "@/components/common/EmptyList";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { InvitationCardList } from "@/components/modules/invitations/InvitationCardList";
import { useInvitationAccept } from "@/hooks/invitations/useInvitationAccept";
import { useInvitationDecline } from "@/hooks/invitations/useInvitationDecline";
import { useInvitationsListReceived } from "@/hooks/invitations/useInvitationsListReceived";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import styles from "./InvitationsListReceived.module.css";

export const InvitationsListReceived = () => {
  useDocumentTitleApp("Invitaciones Recibidas 📥");
  const { isCapacitor } = useApp();
  const {
    list,
    isLoading,
    isLoadMore,
    isEmpty,
    showLoadMoreBtn,
    handleRefresh,
    handleLoadMore,
  } = useInvitationsListReceived();
  const { handleDecline } = useInvitationDecline({
    handleRefresh,
  });

  const { handleAccept } = useInvitationAccept({
    handleReload: handleRefresh,
  });

  return (
    <>
      <Fetcher
        handleRefresh={handleRefresh}
        classNameSection="animate__animated animate__screenInUp"
        isLoading={isLoading}
      >
        <>
          {isEmpty && <EmptyList title="No tienes invitaciones recibidas" />}
          <div
            className={`dataListContainer ${isCapacitor ? "isCapacitor" : ""} `}
          >
            {(isLoading && !list.length) || isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      height={130}
                      className={styles.invitationsListCardSkeleton}
                    />
                  ))
              : list.map((invitation) => (
                  <InvitationCardList
                    key={invitation.id}
                    invitation={invitation}
                    handleAccept={handleAccept}
                    handleCancel={handleDecline}
                  />
                ))}
          </div>
          {showLoadMoreBtn && (
            <ButtonLoadMore
              handleLoadMore={handleLoadMore}
              isLoading={isLoadMore}
            />
          )}
        </>
      </Fetcher>
    </>
  );
};
