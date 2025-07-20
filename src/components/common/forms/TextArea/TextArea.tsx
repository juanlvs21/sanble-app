import { IonItem, IonNote, IonTextarea } from "@ionic/react";
import { forwardRef } from "react";

export type ComponentProps = typeof IonTextarea.defaultProps & {
  Icon?: React.ReactElement;
  helper?: string | React.ReactElement;
  helperIsError?: boolean;
};

export const TextArea = forwardRef<HTMLIonTextareaElement, ComponentProps>(
  function ({ Icon, helper, helperIsError, ...rest }: ComponentProps, ref) {
    return (
      <IonItem
        fill="outline"
        className={`inputItem textareItem ${Icon ? "inputWithIcon" : ""}`}
      >
        {Icon && (
          <span slot="start" className="slotIconStart">
            {Icon}
          </span>
        )}
        <IonTextarea ref={ref} {...rest} />
        <IonNote
          slot={helperIsError ? "error" : "helper"}
          className="textAreaError"
        >
          {helper}
        </IonNote>
        {rest.maxlength && (
          <IonNote slot="helper">
            {(rest?.value || "")?.toString().length}/{rest.maxlength}
          </IonNote>
        )}
      </IonItem>
    );
  }
);
