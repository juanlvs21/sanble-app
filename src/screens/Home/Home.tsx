import { lazy } from "react";
// import { BiBell } from "react-icons/bi";

// import { Button } from "@/components/common/buttons/Button";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
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
  useDocumentTitleApp("Inicio 🏠");
  // const { renderTopBarActionEnd } = useTopBarMain();
  const {
    fairsBest,
    standsBest,
    productRecent,
    isLoadingFairsBest,
    isLoadingStandsBest,
    isLoadingProductsRecent,
    handleLoadAllData,
  } = useHome();

  throw new Error("This is a test error for the Home screen");

  return (
    <>
      {/* {renderTopBarActionEnd(
        <Button className="animate__animated animate__fadeIn">
          <span className={styles.notificationBadge} /> 
          <BiBell size={24} />
        </Button>
      )} */}
      <HomeScreenContent
        handleLoadData={handleLoadAllData}
        fairsBest={fairsBest || []}
        standsBest={standsBest || []}
        productsRecent={productRecent || []}
        isLoadingFairsBest={isLoadingFairsBest}
        isLoadingStandsBest={isLoadingStandsBest}
        isLoadingProductsRecent={isLoadingProductsRecent}
      />
    </>
  );
};
