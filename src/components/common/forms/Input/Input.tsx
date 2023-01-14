import { IonInput, IonTextarea, IonItem, IonNote } from "@ionic/react";

import { TInput } from "@/types/TComponents";

export type ComponentProps = TInput & {
  Icon?: React.ReactElement;
  helper?: string | React.ReactElement;
  helperIsError?: boolean;
  /**
   * Switch component between input and textarea
   */
  textarea?: boolean;
};

export const Input = ({
  Icon,
  helper,
  helperIsError,
  textarea,
  ...rest
}: ComponentProps) => (
  <IonItem
    fill="outline"
    className={`inputItem ${textarea ? "textareItem" : ""} ${
      Icon ? "inputWithIcon" : ""
    }`}
  >
    {Icon && (
      <span slot="start" className="slotIconStart">
        {Icon}
      </span>
    )}
    {textarea ? <IonTextarea {...rest} /> : <IonInput {...rest} />}
    <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
    {rest.maxlength && (
      <IonNote slot="helper">
        {rest.value?.length}/{rest.maxlength}
      </IonNote>
    )}
  </IonItem>
);
