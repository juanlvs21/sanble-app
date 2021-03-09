import React, { useState } from "react";
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { giftOutline } from "ionicons/icons";

// Styles
import styles from "./PromotionsList.module.css";

// Components
import PromotionModal from "./PromotionModal";

// Interfaces
import { IItem, IPromotion } from "../../interfaces/IStands";

interface ContainerProps {
  items: Array<IItem> | undefined;
  promotions: Array<IPromotion> | undefined;
}

const StandPromotionsList: React.FC<ContainerProps> = ({
  items,
  promotions,
}) => {
  const [showModalPromotion, setShowModalPromotion] = useState<boolean>(false);
  const [promotion, setPromotion] = useState<IPromotion>();

  const handleShowItem = (uuid: string) => {
    const findPromotion = promotions?.find((itm) => itm.uuid === uuid);
    if (findPromotion) {
      setPromotion(findPromotion);
      setShowModalPromotion(true);
    }
  };

  return (
    <>
      <IonList className="animate__animated animate__fadeIn">
        {promotions
          ?.filter(({ is_active }: IPromotion) => is_active)
          .map((promotion: IPromotion) => (
            <IonItem
              key={promotion.uuid}
              className={styles.item}
              onClick={() => handleShowItem(promotion.uuid)}
            >
              <IonIcon icon={giftOutline} className={styles.icon} />
              <IonLabel>{promotion.title}</IonLabel>
            </IonItem>
          ))}
      </IonList>

      <PromotionModal
        promotion={promotion}
        items={items}
        showModal={showModalPromotion}
        setShowModal={setShowModalPromotion}
      />
    </>
  );
};

export default StandPromotionsList;
