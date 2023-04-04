import { IonItem, IonNote, IonTextarea } from "@ionic/react";

export type ComponentProps = typeof IonTextarea.defaultProps & {
  Icon?: React.ReactElement;
  helper?: string | React.ReactElement;
  helperIsError?: boolean;
};

export const TextArea = ({
  Icon,
  helper,
  helperIsError,
  ...rest
}: ComponentProps) => (
  <IonItem
    fill="outline"
    className={`inputItem textareItem ${Icon ? "inputWithIcon" : ""}`}
  >
    {Icon && (
      <span slot="start" className="slotIconStart">
        {Icon}
      </span>
    )}
    <IonTextarea {...rest} />
    <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
    {rest.maxlength && (
      <IonNote slot="helper">
        {rest?.value?.toString().length}/{rest.maxlength}
      </IonNote>
    )}
  </IonItem>
);
