import React, { useState, useMemo } from "react";
import { IonModal, IonButton } from "@ionic/react";

// Styles
import styles from "./Modals.module.css";

// Components
import NoImage from "../../assets/images/no-image.png";
import ImageSkeleton from "../skeleton/Image";

// Hooks
import useDarkmode from "../../hooks/useDarkmode";

// Interfaces
import { IPromotion, IItem } from "../../interfaces/IStands";

interface ContainerProps {
  promotion: IPromotion | undefined;
  items: Array<IItem> | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const StandPromotionModal: React.FC<ContainerProps> = ({
  promotion,
  items,
  showModal,
  setShowModal,
}) => {
  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const { darkMode } = useDarkmode();

  const itemsPromo: Array<IItem> | undefined = useMemo(() => {
    const itemsProms: Array<string> | undefined = promotion?.items;

    if (itemsProms?.length)
      return items?.filter((itm: IItem) => itemsProms.indexOf(itm.uuid));
    else return [];
  }, [promotion, items]);

  console.log(itemsPromo);

  const handleClose = () => setShowModal(false);

  return (
    <IonModal isOpen={showModal} onDidDismiss={handleClose}>
      <div className={styles.btn_container}>
        <IonButton
          className={styles.btn_close}
          color="medium"
          size="small"
          fill="outline"
          onClick={handleClose}
        >
          x
        </IonButton>
      </div>

      <div className={`${styles.content} ${darkMode && styles.dark_mode}`}>
        <h3 className={styles.name}>{promotion?.title}</h3>
        <div className={styles.img_container}>
          {loadingImg && <ImageSkeleton className={styles.img_skeleton} />}
          <img
            src={promotion?.url_photo ? promotion?.url_photo : NoImage}
            alt={promotion?.title}
            onLoad={() => setLoadingImg(false)}
          />
        </div>

        <p className={styles.description}>{promotion?.description}</p>

        {itemsPromo?.length ? (
          <ul>
            <h4>Artículos involucrados: </h4>
            {itemsPromo?.map((itm: IItem) => (
              <li key={itm.uuid}>{itm.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </IonModal>
  );
};

export default StandPromotionModal;
