import { useEffect } from "react";
import { BiBell } from "react-icons/bi";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/common/buttons/Button";
import { Carousel } from "@/components/common/Carousel";
import { Fetcher } from "@/components/common/Fetcher";
import { InputSearch } from "@/components/common/forms/InputSearch";
import { TopBar } from "@/components/common/TopBar";
import { FairCardBest } from "@/components/modules/fairs/FairCardBest";
import { ProductCarouselCard } from "@/components/modules/products/ProductCard";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useHome } from "@/hooks/useHome";
import styles from "./Home.module.css";

export const Home = () => {
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
  const isLaptop = useMediaQuery("(min-width: 1024px)");

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
      <Fetcher
        handleRefresh={handleLoadData}
        classNameContent={styles.homeContainer}
      >
        <InputSearch
          placeholder="Buscar Ferias, Stands, etc..."
          classNameItem={styles.homeSearchInput}
        />
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
            height: isLaptop ? 200 : 110,
          }}
          className={styles.homeCarousel}
        />
        <Carousel
          title="Productos"
          isLoading={isLoadingProductTypes}
          items={
            productTypes?.map((productType) => (
              <ProductCarouselCard
                key={productType.id}
                productType={productType}
              />
            )) || []
          }
          slidesPerView={1.9}
          breakpoints={{
            310: { slidesPerView: 2.2 },
            425: { slidesPerView: 3.2 },
            550: { slidesPerView: 3.8 },
            630: { slidesPerView: 4.2 },
            900: { slidesPerView: 4.8 },
            991: { slidesPerView: 3.1 },
            1600: { slidesPerView: 3.7 },
          }}
          skeletonProps={{
            width: "100%",
            height: isLaptop ? 200 : 110,
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
            height: isLaptop ? 200 : 110,
          }}
          className={styles.homeCarousel}
        />
      </Fetcher>
    </>
  );
};
