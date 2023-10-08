import { IonInput, IonItem, IonNote } from "@ionic/react";
import { forwardRef } from "react";

import { TInputHelpers } from "@/types/TComponents";

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
     * ClassName item css
     */
    classNameItem?: string;
  };

export const Input = forwardRef<HTMLIonInputElement, ComponentProps>(function (
  { Icon, helper, helperIsError, classNameItem = "", ...rest }: ComponentProps,
  ref
) {
  return (
    <IonItem
      fill="outline"
      className={`inputItem  ${Icon ? "inputWithIcon" : ""} ${classNameItem}`}
    >
      {Icon && (
        <span slot="start" className="slotIconStart">
          {Icon}
        </span>
      )}
      <IonInput ref={ref} {...rest} />
      <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
    </IonItem>
  );
});
