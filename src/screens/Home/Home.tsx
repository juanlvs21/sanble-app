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
import { TStand } from "@/types/TStands";
import { TFair } from "@/types/TFairs";

const stands: TStand[] = [
  {
    name: "Mojitos buenos",
    description: "Lorem ipsum lorem ipsum",
    slogan: "Lorem ipsum lorem ipsum",
    products: [],
    promotions: [],
    stars: 3,
    uuid: "34534-456-456-456",
    uuid_user: "34234-234-234-234",
  },
  {
    name: "Donas donitas",
    description: "Lorem ipsum lorem ipsum",
    slogan: "Lorem ipsum lorem ipsum",
    products: [],
    promotions: [],
    stars: 3,
    uuid: "34534-34543-456-sdf",
    uuid_user: "34234-234-234-234",
  },
];

export const HomeSreen: React.FC = () => {
  const active = useSreenActive("/");
  const { fairs, handleRefresh } = useHome();

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
        keyName="uuid"
        card={(data: TFair) => <FairCardCarousel fair={data} />}
      />

      <h3 className={styles.title}>Mejores Stands</h3>
      <Carousel
        data={stands}
        keyName="uuid"
        card={(data: TStand) => <StandCardCarousel stand={data} />}
      />

      <h3 className={styles.title}>Productos</h3>
      <Carousel
        data={[]}
        keyName="uuid"
        card={(data) => <FairCardCarousel />}
      />

      <h3 className={styles.title}>Promociones</h3>
      <Carousel
        data={[]}
        keyName="uuid"
        card={(data) => <FairCardCarousel />}
      />
    </MainLayout>
  );
};
