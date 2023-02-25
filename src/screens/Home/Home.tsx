import { lazy, useEffect } from "react";
import { BiBell } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useHome } from "@/hooks/useHome";
import { useTopBarMain } from "@/hooks/useTopBarMain";

const HomeScreenContent = lazy(() =>
  import("@/components/modules/home/HomeScreenContent").then(
    ({ HomeScreenContent }) => ({
      default: HomeScreenContent,
    })
  )
);

export const Home = () => {
  useDocumentTitle("Inicio 🏠");
  const { renderTopBarActionEnd } = useTopBarMain();
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
      {renderTopBarActionEnd(
        <Button className="animate__animated animate__fadeIn">
          {/* <span className={styles.notificationBadge} />  */}
          {/* TODO: Enable this when notifications are working */}
          <BiBell size={24} />
        </Button>
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
