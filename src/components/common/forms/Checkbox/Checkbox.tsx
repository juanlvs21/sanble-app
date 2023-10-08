import { IonCheckbox, IonItem, IonLabel, IonNote } from "@ionic/react";
import { forwardRef } from "react";

import { TCheckbox } from "@/types/TComponents";

export type ComponentProps = TCheckbox & {
  helper?: string | React.ReactElement;
  helperIsError?: boolean;
  /**
   * Label checkbox
   */
  label?: string;
};

export const Checkbox = forwardRef<HTMLIonCheckboxElement, ComponentProps>(
  function ({ label, helper, helperIsError, ...rest }: ComponentProps, ref) {
    return (
      <IonItem fill="outline" className="inputItem inputCheckbox">
        <IonCheckbox ref={ref} slot="start" {...rest} />
        {label && <IonLabel>{label}</IonLabel>}
        <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
      </IonItem>
    );
  }
);
