import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

// Style
import styles from "./Items.module.css";

// Images
import NoImage from "../../assets/images/no-image.png";

// Components
import Rating from "../stars/Rating";

// Hooks
// import useCurrency from "../../hooks/useCurrency";

// Utils
import formatCurrency from "../../utils/formatCurrency";

// Interfaces
import { IItem } from "../../interfaces/IStands";

interface ContainerProps {
  items: Array<IItem> | undefined;
}

const StandItemsList: React.FC<ContainerProps> = ({ items }) => {
  // const { usdValue } = useCurrency();

  return (
    <IonGrid className={styles.items_container}>
      <IonRow className={styles.items_row}>
        {items?.map((item: IItem) => (
          <IonCol
            sizeXs="12"
            sizeMd="6"
            sizeLg="4"
            key={item.uuid}
            className={styles.items_col}
          >
            <div
              className={styles.items_card_container}
              style={{
                backgroundImage: `url(${
                  item.url_photo ? item.url_photo : NoImage
                })`,
              }}
            >
              <div className={styles.items_gradient} />
              <div className={styles.items_card}>
                <h2 className={styles.items_name}>{item.name}</h2>
                <Rating stars={Math.ceil(item.stars / item.scorers)} />
                <span className={styles.items_price}>
                  Bs. {formatCurrency(item.price)}
                </span>
                {/* <span>{item.price / usdValue}</span> */}
              </div>
            </div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default StandItemsList;
