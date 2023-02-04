import { IonCheckbox, IonItem, IonLabel, IonNote } from "@ionic/react";

import { TCheckbox } from "@/types/TComponents";

export type ComponentProps = TCheckbox & {
  helper?: string | React.ReactElement;
  helperIsError?: boolean;
  /**
   * Label checkbox
   */
  label?: string;
};

export const Checkbox = ({
  label,
  helper,
  helperIsError,
  ...rest
}: ComponentProps) => (
  <IonItem fill="outline" className="inputItem inputCheckbox">
    <IonCheckbox slot="start" {...rest} />
    {label && <IonLabel>{label}</IonLabel>}
    <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
  </IonItem>
);
