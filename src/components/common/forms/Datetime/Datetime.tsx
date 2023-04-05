import {
  IonDatetime,
  IonInput,
  IonItem,
  IonModal,
  IonNote,
} from "@ionic/react";
import { DatetimeChangeEventDetail, IonDatetimeCustomEvent } from "@ionic/core";
import { useState } from "react";

import { TInputHelpers } from "@/types/TComponents";
import styles from "./Datetime.module.css";

export type ComponentProps = typeof IonInput.defaultProps &
  TInputHelpers & {
    /**
     * Icon Start
     */
    Icon?: React.ReactElement;
    /**
     * Error content
     */
    helper?: string | React.ReactElement;
    /**
     * Show error
     */
    helperIsError?: boolean;
    /**
     * Set datetime value in input text value
     */
    onSetValue?: (e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) => void;
    /**
     * Modal props
     */
    modalProps?: typeof IonModal.defaultProps;
    /**
     * Datetime props
     */
    datetimeProps?: typeof IonDatetime.defaultProps;
  };

export const Datetime = ({
  Icon,
  helper,
  helperIsError,
  onSetValue,
  modalProps,
  datetimeProps,
  ...rest
}: ComponentProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
  ) => {
    if (onSetValue) {
      e.target.name = rest.name || "";
      onSetValue(e);
      setOpen(false);
    }
  };

  return (
    <IonItem
      fill="outline"
      className={`inputItem  ${Icon ? "inputWithIcon" : ""}`}
    >
      {Icon && (
        <span slot="start" className="slotIconStart">
          {Icon}
        </span>
      )}
      <IonInput {...rest} onClick={() => setOpen(true)} />

      <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>

      <IonModal
        {...modalProps}
        isOpen={open}
        className={`${styles.datetimeModal} ${modalProps?.className}`}
        onDidDismiss={() => setOpen(false)}
        canDismiss
        backdropDismiss
      >
        <IonDatetime
          {...datetimeProps}
          showDefaultButtons
          doneText="Aceptar"
          cancelText="Cancelar"
          onIonChange={handleChange}
          onIonCancel={() => setOpen(false)}
        />
      </IonModal>
    </IonItem>
  );
};
