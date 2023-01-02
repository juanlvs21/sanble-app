import { IonModal as IonModalType } from "@ionic/core/components";
import { IonContent, IonModal } from "@ionic/react";
import { RefAttributes, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiEnvelope } from "react-icons/bi";
import { FiMapPin, FiPhone } from "react-icons/fi";

import { Button } from "@/components/common/buttons/Button";
import styles from "./InfoModal.module.css";

export type ComponentProps = Partial<IonModalType> &
  RefAttributes<HTMLIonModalElement> & {
    /**
     * Custom className component
     */
    className?: string;
    /**
     * Address
     */
    address?: string;
    /**
     * Contact Phone
     */
    contactPhone?: string;
    /**
     * Contact Email
     */
    contactEmail?: string;
  };

export const InfoModal: React.FC<ComponentProps> = ({
  ref,
  className,
  address,
  contactPhone,
  contactEmail,
  ...props
}) => {
  const modalInfo = useRef<HTMLIonModalElement>(null);

  const onDismiss = () => modalInfo.current?.dismiss();

  return (
    <IonModal
      ref={modalInfo}
      className={`${className} ${styles.infoModal}`}
      {...props}
    >
      <IonContent>
        <Button
          onClick={onDismiss}
          fill="clear"
          color="medium"
          className={styles.infoClose}
        >
          <AiOutlineClose size={24} />
        </Button>
        <div className={styles.infoContent}>
          <h1>Información de Contacto</h1>

          {address && (
            <p>
              <FiMapPin size={20} />
              <span>{address}</span>
            </p>
          )}
          {contactPhone && (
            <p>
              <FiPhone size={20} />
              <span>{contactPhone}</span>
            </p>
          )}
          {contactEmail && (
            <p>
              <BiEnvelope size={20} />
              <span>{contactEmail}</span>
            </p>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};
