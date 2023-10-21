import {
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AiOutlineClose } from "react-icons/ai";

import { HeaderModal } from "@/components/common/HeaderModal";
import { Button } from "@/components/common/buttons/Button";
import styles from "./InviteToMyFairModal.module.css";
import { useBoolean } from "usehooks-ts";

export const InviteToMyFairModal = () => {
  const { value: showModal, toggle: toggleModal } = useBoolean();

  return (
    <>
      <div
        className={`${styles.inviteBtnContainer} animate__animated animate__fadeIn`}
        onClick={toggleModal}
      >
        <Button color="secondary">Invitar a mis Ferias</Button>
      </div>

      <IonModal isOpen={showModal}>
        <HeaderModal>
          <IonToolbar>
            <IonTitle>Invitar a mis Ferias</IonTitle>
            <IonButtons slot="end">
              <Button
                onClick={() => toggleModal()}
                fill="clear"
                color="medium"
                className={styles.productFormModalClose}
              >
                <AiOutlineClose size={24} />
              </Button>
            </IonButtons>
          </IonToolbar>
        </HeaderModal>
        <IonContent className={styles.productFormModalContent}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            dolorum quasi laudantium reprehenderit neque adipisci vel, minus,
            minima excepturi similique nisi dolore odio hic repellendus tempora
            quidem, et fugit. Provident?
          </p>
        </IonContent>
      </IonModal>
    </>
  );
};
