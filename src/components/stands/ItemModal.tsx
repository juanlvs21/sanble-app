import React, { useState } from "react";
import { IonModal, IonButton } from "@ionic/react";

// Styles
import styles from "./Modals.module.css";

// Components
import NoImage from "../../assets/images/no-image.png";
import ImageSkeleton from "../skeleton/Image";

// Hooks
import useDarkmode from "../../hooks/useDarkmode";

// Utils
import formatCurrency from "../../utils/formatCurrency";

// Interfaces
import { IItem } from "../../interfaces/IStands";

interface ContainerProps {
  item: IItem | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const StandItemModal: React.FC<ContainerProps> = ({
  item,
  showModal,
  setShowModal,
}) => {
  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const { darkMode } = useDarkmode();

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
        <h3 className={styles.name}>{item?.name}</h3>
        <div className={styles.img_container}>
          {loadingImg && <ImageSkeleton className={styles.img_skeleton} />}
          <img
            src={item?.url_photo ? item?.url_photo : NoImage}
            alt={item?.name}
            onLoad={() => setLoadingImg(false)}
            onError={() => setLoadingImg(false)}
          />
        </div>
        <p className={styles.description}>{item?.description}</p>
        <p className={styles.price}>
          Bs. {formatCurrency(item?.price as number)}
        </p>
      </div>
    </IonModal>
  );
};

export default StandItemModal;
