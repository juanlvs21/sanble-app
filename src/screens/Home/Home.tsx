import { lazy, useEffect } from "react";
import { createPortal } from "react-dom";
import { BiBell } from "react-icons/bi";
import { RouteComponentProps } from "react-router";

import { Button } from "@/components/common/buttons/Button";
import { TopBar } from "@/components/common/TopBar";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useHome } from "@/hooks/useHome";
import { useTopBar } from "@/hooks/useTopBar";

const HomeScreenContent = lazy(() =>
  import("@/components/modules/home/HomeScreenContent").then(
    ({ HomeScreenContent }) => ({
      default: HomeScreenContent,
    })
  )
);

type TPageProps = RouteComponentProps<{}>;

export const Home: React.FC<TPageProps> = () => {
  useDocumentTitle("Inicio 🏠");
  const { renderTopBar } = useTopBar();
  const {
    handleLoadFairsBest,
    handleLoadStandsBest,
    handleLoadProductTypes,
    fairsBest,
    standsBest,
    productTypes,
    isLoadingFairsBest,
    isLoadingStandsBest,
    isLoadingProductTypes,
  } = useHome();

  const handleLoadData = async () => {
    await Promise.all([
      handleLoadFairsBest(),
      handleLoadStandsBest(),
      handleLoadProductTypes(),
    ]);
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <>
      {renderTopBar(
        <TopBar
          title="Sanble"
          end={
            <Button>
              {/* <span className={styles.notificationBadge} />  */}
              {/* TODO: Enable this when notifications are working */}
              <BiBell size={24} />
            </Button>
          }
          startUser
          sticky
        />
      )}

      <HomeScreenContent
        handleLoadData={handleLoadData}
        fairsBest={fairsBest}
        standsBest={standsBest}
        productTypes={productTypes}
        isLoadingFairsBest={isLoadingFairsBest}
        isLoadingStandsBest={isLoadingStandsBest}
        isLoadingProductTypes={isLoadingProductTypes}
      />
    </>
  );
};
