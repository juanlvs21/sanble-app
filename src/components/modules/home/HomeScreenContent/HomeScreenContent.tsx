import { useMediaQuery } from "usehooks-ts";

import { Carousel } from "@/components/common/Carousel";
import { Fetcher } from "@/components/common/Fetcher";
// import { InputSearch } from "@/components/common/forms/InputSearch";
import { FairCardBest } from "@/components/modules/fairs/FairCardBest";
// import { ProductCarouselCard } from "@/components/modules/products/ProductCard";
import { ProductCardRecent } from "@/components/modules/products/ProductCardRecent";
import { StandCardBest } from "@/components/modules/stands/StandCardBest";
import { TFair } from "@/types/TFair";
import { TProduct } from "@/types/TProduct";
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
   * List Best Stands
   */
  productsRecent: TProduct[];
  /**
   * List Product Types
   */
  // productTypes: TProductType[];
  /**
   * Loading Best Fairs
   */
  isLoadingFairsBest?: boolean;
  /**
   * Loading Best Stands
   */
  isLoadingStandsBest?: boolean;
  /**
   * Loading Product Recent
   */
  isLoadingProductsRecent?: boolean;
  /**
   * Loading Product Types
   */
  isLoadingProductTypes?: boolean;
};

export const HomeScreenContent = ({
  handleLoadData,
  fairsBest,
  standsBest,
  productsRecent,
  // productTypes,
  isLoadingFairsBest,
  isLoadingStandsBest,
  isLoadingProductsRecent,
}: // isLoadingProductTypes,
ComponentProps) => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");

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
          fairsBest.map((fair) => <FairCardBest key={fair.id} fair={fair} />) ||
          []
        }
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
          standsBest.map((stand) => (
            <StandCardBest key={stand.id} stand={stand} />
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
        isLoading={isLoadingProductsRecent}
        items={
          productsRecent.map((product) => (
            <ProductCardRecent key={product.id} product={product} />
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
