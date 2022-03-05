import { useEffect } from "react";
import { IonButton, IonSearchbar } from "@ionic/react";
import { BiBell } from "react-icons/bi";

import styles from "./Home.module.css";
import { MainLayout } from "@/layouts/Main";
import { Carousel } from "@/components/common/Carousel";
import { FairCardCarousel } from "@/components/fairs/CardCarousel";
import { StandCardCarousel } from "@/components/stands/CardCarousel";
import { useSreenActive } from "@/hooks/useSreenActive";
import { useHome } from "@/hooks/useHome";
import { productTypes } from "@/utils/productData";
import { ProductCardCarousel } from "@/components/products/CardCarousel";

export const HomeSreen: React.FC = () => {
  const active = useSreenActive("/");
  const { fairs, fairsLoading, stands, standsLoading, handleRefresh } =
    useHome();

  useEffect(() => {
    if (active) handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

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
        data={fairs}
        keyName={(data) => data.uuid}
        card={(data, loading) => (
          <FairCardCarousel fair={data} loading={loading} />
        )}
        loading={fairsLoading}
      />

      <h3 className={styles.title}>Mejores Stands</h3>
      <Carousel
        data={stands}
        keyName={(data) => data.uuid}
        card={(data, loading) => (
          <StandCardCarousel stand={data} loading={loading} />
        )}
        loading={standsLoading}
      />

      <h3 className={styles.title}>Promociones</h3>
      <Carousel
        data={[]}
        keyName={(data) => data.uuid}
        card={(data) => <FairCardCarousel />}
      />

      <h3 className={styles.title}>Productos</h3>
      <Carousel
        data={productTypes}
        keyName={(data) => data}
        card={(data) => <ProductCardCarousel type={data} />}
        loading={false}
        slidesPerView={3}
        initialSlide={1}
      />
    </MainLayout>
  );
};
