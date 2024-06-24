import { useIonActionSheet } from "@ionic/react";
import { BiFilterAlt } from "react-icons/bi";

import { EmptyList } from "@/components/common/EmptyList";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { FairCardList } from "@/components/modules/fairs/FairCardList";
import { useFavoritesFairs } from "@/hooks/favorites/useFavoritesFairs";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./InvitationsListReceived.module.css";
import { useInvitationsListReceived } from "@/hooks/invitations/useInvitationsListReceived";

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
  } = useInvitationsListReceived();

  return (
    <>
      <Fetcher
        handleRefresh={handleRefresh}
        classNameSection="animate__animated animate__screenInUp"
        isLoading={isLoading}
      >
        <>
          {isEmpty && <EmptyList title="No tienes invitaciones enviadas" />}
          {/* <div
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
              : list.map((fair) => (
                  <FairCardList
                    key={fair.id}
                    fair={fair}
                    goBackUrl={ERoutesName.FAVORITES_FAIRS}
                  />
                ))}
          </div> */}
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
