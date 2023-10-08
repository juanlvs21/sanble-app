import { IonSelect, IonItem, IonNote } from "@ionic/react";
import { forwardRef } from "react";

import { TInputHelpers } from "@/types/TComponents";

export type ComponentProps = typeof IonSelect.defaultProps &
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

export const Select = forwardRef<HTMLIonSelectElement, ComponentProps>(
  function (
    {
      Icon,
      helper,
      helperIsError,
      classNameItem = "",
      ...rest
    }: ComponentProps,
    ref
  ) {
    return (
      <IonItem
        fill="outline"
        className={`inputItem inputSelect ${
          Icon ? "inputWithIcon" : ""
        } ${classNameItem}`}
      >
        {Icon && (
          <span slot="start" className="slotIconStart">
            {Icon}
          </span>
        )}
        <IonSelect ref={ref} {...rest} />
        <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
      </IonItem>
    );
  }
);
