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
    productTypes,
    isLoadingFairsBest,
    isLoadingStandsBest,
    // isLoadingProductTypes,
    handleLoadAllData,
  } = useHome();

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
        standsBest={(standsBest as any) || []}
        productTypes={productTypes || []}
        isLoadingFairsBest={isLoadingFairsBest}
        isLoadingStandsBest={isLoadingStandsBest}
        // isLoadingProductTypes={isLoadingProductTypes}
      />
    </>
  );
};
