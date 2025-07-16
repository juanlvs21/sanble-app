import { IonContent, IonModal } from "@ionic/react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiEnvelope } from "react-icons/bi";
import { FiMapPin, FiPhone } from "react-icons/fi";

import { Button } from "@/components/common/buttons/Button";
import { useToast } from "@/hooks/useToast";
import styles from "./InfoModal.module.css";

export type ComponentProps = {
  /**
   * Custom className component
   */
  className?: string;
  /**
   * Trigger open modal
   */
  trigger?: string;
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

export const InfoModal = ({
  trigger,
  address,
  contactPhone,
  contactEmail,
  className = "",
}: ComponentProps) => {
  const { toast, toastDismiss } = useToast();
  const modalInfo = useRef<HTMLIonModalElement>(null);

  const handleCopyClipBoard = (
    text: string = "",
    message = "Texto copiado"
  ) => {
    toastDismiss();

    navigator.clipboard.writeText(text);

    setTimeout(() => {
      toast(message, {
        type: "info",
        hideProgressBar: true,
        closeButton: <i />,
      });
    }, 400);
  };

  return (
    <IonModal
      ref={modalInfo}
      trigger={trigger}
      className={`${className} ${styles.infoModal}`}
    >
      <IonContent>
        <Button
          onClick={() => modalInfo.current?.dismiss()}
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
            <p
              className="info-contact-clickable"
              onClick={() =>
                handleCopyClipBoard(
                  parsePhoneNumberFromString(contactPhone, "VE")?.number,
                  "Número de teléfono copiado"
                )
              }
            >
              <FiPhone size={20} />
              <span>
                {parsePhoneNumberFromString(contactPhone, "VE")?.number}
              </span>
            </p>
          )}
          {contactEmail && (
            <p
              className="info-contact-clickable"
              onClick={() =>
                handleCopyClipBoard(
                  contactEmail,
                  "Dirección de correo electrónico copiado"
                )
              }
            >
              <BiEnvelope size={20} />
              <span>{contactEmail}</span>
            </p>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};
