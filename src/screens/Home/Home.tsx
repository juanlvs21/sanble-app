import { IonButton, IonSearchbar } from "@ionic/react";
import { BiBell } from "react-icons/bi";

import styles from "./Home.module.css";
import { MainLayout } from "@/layouts/Main";
import { Carousel } from "@/components/common/Carousel";
import { FairCardCarousel } from "@/components/fairs/CardCarousel";
import { StandCardCarousel } from "@/components/stands/CardCarousel";
import { EFairType, TFair } from "@/types/TFairs";
import { TStand } from "@/types/TStands";

const fairs: TFair[] = [
  {
    description: "Lorem ipsum",
    name: "Nombre de mi feria",
    stars: 3,
    type: EFairType.ENTREPRENEURSHIP,
    uuid: "23948234-23423847234-23",
    uuid_user: "34234-234-234-234",
    date_time: new Date().getTime(),
  },
  {
    description: "Lorem ipsum 2",
    name: "Esta es mi feria 2",
    stars: 2,
    type: EFairType.ENTREPRENEURSHIP,
    uuid: "324-423423-234-654",
    uuid_user: "34234-234-234-234",
    date_time: new Date().getTime(),
  },
];

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
    <MainLayout headerEnd={notificationsBtn}>
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
        data={fairs}
        keyName="uuid"
        card={(data) => <FairCardCarousel />}
      />

      <h3 className={styles.title}>Promociones</h3>
      <Carousel
        data={fairs}
        keyName="uuid"
        card={(data) => <FairCardCarousel />}
      />
    </MainLayout>
  );
};
