import { IonButton, IonSearchbar } from "@ionic/react";
import { BiBell } from "react-icons/bi";

import styles from "./Home.module.css";
import { MainLayout } from "@/layouts/Main";
import { TabBar } from "@/components/common/TabBar";
import { Carousel } from "@/components/common/Carousel";
import { FairCardCarousel } from "@/components/fairs/CardCarousel";
import { StandCardCarousel } from "@/components/stands/CardCarousel";
import { useHome } from "@/hooks/useHome";
import { productTypes } from "@/utils/productData";
import { ProductCardCarousel } from "@/components/products/CardCarousel";

export const HomeSreen: React.FC = () => {
  const {
    dataFairs,
    isLoadingFairs,
    dataStands,
    isLoadingStands,
    handleRefresh,
  } = useHome();

  const notificationsBtn = (
    <IonButton
      slot="end"
      fill="solid"
      color="light"
      className={styles.headerBtn}
    >
      <BiBell size={28} />
    </IonButton>
  );

  return (
    <MainLayout headerEnd={notificationsBtn} handleRefresh={handleRefresh}>
      <IonSearchbar
        placeholder="Buscar Ferias, Stands, etc..."
        className={styles.searchbar}
      />
      <h3 className={styles.title}>Próximas Ferias</h3>
      <Carousel
        data={dataFairs}
        keyName={(data) => data.id}
        card={(data, loading) => (
          <FairCardCarousel fair={data} loading={loading} />
        )}
        loading={isLoadingFairs}
      />

      <h3 className={styles.title}>Mejores Stands</h3>
      <Carousel
        data={dataStands}
        keyName={(data) => data.id}
        card={(data, loading) => (
          <StandCardCarousel stand={data} loading={loading} />
        )}
        loading={isLoadingStands}
      />

      {/* <h3 className={styles.title}>Promociones</h3>
      <Carousel
        data={[]}
        keyName={(data) => data.id}
        card={(data) => <FairCardCarousel />}
      /> */}

      <h3 className={styles.title}>Productos</h3>
      <Carousel
        data={productTypes}
        keyName={(data) => data}
        card={(data) => <ProductCardCarousel type={data} />}
        loading={false}
        slidesPerView={3}
        initialSlide={1}
      />

      <TabBar />
    </MainLayout>
  );
};

export default HomeSreen;
