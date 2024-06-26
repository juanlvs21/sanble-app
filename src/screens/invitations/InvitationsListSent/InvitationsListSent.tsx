import { EmptyList } from "@/components/common/EmptyList";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { InvitationCardList } from "@/components/modules/invitations/InvitationCardList";
import { useInvitationUnsend } from "@/hooks/invitations/useInvitationUnsend";
import { useInvitationsListSent } from "@/hooks/invitations/useInvitationsListSent";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import styles from "./InvitationsListSent.module.css";

export const InvitationsListSent = () => {
  useDocumentTitleApp("Invitaciones Enviadas 📤");
  const { isCapacitor } = useApp();
  const {
    list,
    isLoading,
    isLoadMore,
    isEmpty,
    showLoadMoreBtn,
    handleRefresh,
    handleLoadMore,
  } = useInvitationsListSent();
  const { handleUnsend } = useInvitationUnsend({
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
          {isEmpty && <EmptyList title="No tienes invitaciones enviadas" />}
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
                    handleAccept={() => Promise.resolve()}
                    handleCancel={handleUnsend}
                    sentByMe
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
