import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { BiBell } from "react-icons/bi";

import { Button } from "@/components/common/buttons/Button";
import { Carousel } from "@/components/common/Carousel";
import { Fetcher } from "@/components/common/Fetcher";
import { InputSearch } from "@/components/common/forms/InputSearch";
import { TopBar } from "@/components/common/TopBar";
import { FairCardBest } from "@/components/modules/fairs/FairCardBest";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useHome } from "@/hooks/useHome";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  useDocumentTitle("Inicio 🏠");
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
  const isLaptop = useMediaQuery({ query: "(min-width: 1024px)" });

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
      <InputSearch
        placeholder="Buscar Ferias, Stands, etc..."
        classNameItem={styles.homeSearchInput}
      />
      <Fetcher
        handleRefresh={handleLoadData}
        classNameContent={styles.homeContainer}
      >
        <Carousel
          title="Mejores Ferias"
          isLoading={isLoadingFairsBest}
          items={
            fairsBest?.map((fair) => (
              <FairCardBest key={fair.id} fair={fair} />
            )) || []
          }
          skeletonProps={{
            width: "100%",
            height: isLaptop ? 180 : 110,
          }}
          className={styles.homeCarousel}
        />
        <Carousel
          title="Productos"
          isLoading={isLoadingProductTypes}
          items={
            productTypes?.map((type) => (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#ff8634",
                  borderRadius: 20,
                }}
              >
                <span>{type.name}</span>
              </div>
            )) || []
          }
          skeletonProps={{
            width: "100%",
            height: isLaptop ? 180 : 110,
          }}
          className={styles.homeCarousel}
        />
        <Carousel
          title="Mejores Stands"
          isLoading={isLoadingStandsBest}
          items={
            standsBest?.map((stand) => (
              <div
                key={stand.id}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#ff8634",
                  borderRadius: 20,
                }}
              >
                <span>{stand.name}</span>
              </div>
            )) || []
          }
          skeletonProps={{
            width: "100%",
            height: isLaptop ? 180 : 110,
          }}
          className={styles.homeCarousel}
        />
      </Fetcher>
    </>
  );
};
