import { useMediaQuery } from "usehooks-ts";

import { Carousel } from "@/components/common/Carousel";
import { Fetcher } from "@/components/common/Fetcher";
// import { InputSearch } from "@/components/common/forms/InputSearch";
import { FairCardBest } from "@/components/modules/fairs/FairCardBest";
// import { ProductCarouselCard } from "@/components/modules/products/ProductCard";
import { TFair } from "@/types/TFair";
import { TProductType } from "@/types/TProduct";
import { useApp } from "@/hooks/useApp";
import { TStand } from "@/types/TStand";
import styles from "./HomeScreenContent.module.css";

export type ComponentProps = {
  /**
   * Callback to load all data
   */
  handleLoadData: () => Promise<void>;
  /**
   * List Best Fairs
   */
  fairsBest: TFair[];
  /**
   * List Best Stands
   */
  standsBest: TStand[];
  /**
   * List Product Types
   */
  productTypes: TProductType[];
  /**
   * Loading Best Fairs
   */
  isLoadingFairsBest?: boolean;
  /**
   * Loading Best Stands
   */
  isLoadingStandsBest?: boolean;
  /**
   * Loading Product Types
   */
  isLoadingProductTypes?: boolean;
};

export const HomeScreenContent = ({
  handleLoadData,
  fairsBest,
  standsBest,
  // productTypes,
  isLoadingFairsBest,
  isLoadingStandsBest,
}: // isLoadingProductTypes,
ComponentProps) => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const { isCapacitor } = useApp();

  return (
    <Fetcher
      handleRefresh={handleLoadData}
      classNameContent={styles.homeContainer}
      classNameSection="animate__animated animate__screenInUp"
    >
      {/* <InputSearch
        placeholder="Buscar Ferias, Stands, etc..."
        classNameItem={`${styles.homeSearchInput} ${
          isCapacitor ? styles.homeSearchInputCapacitor : ""
        }`}
      /> */}
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
      {/* <Carousel
        title="Productos"
        isLoading={isLoadingProductTypes}
        items={
          productTypes?.map((productType) => (
            <ProductCarouselCard
              key={productType.key}
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
      /> */}
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
      <Carousel
        title="Productos Recientes"
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
  );
};
