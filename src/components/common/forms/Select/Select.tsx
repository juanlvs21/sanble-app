import { IonSelect, IonItem, IonNote } from "@ionic/react";

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
  };

export const Select = ({
  Icon,
  helper,
  helperIsError,
  ...rest
}: ComponentProps) => (
  <IonItem
    fill="outline"
    className={`inputItem inputSelect ${Icon ? "inputWithIcon" : ""}`}
  >
    {Icon && (
      <span slot="start" className="slotIconStart">
        {Icon}
      </span>
    )}
    <IonSelect {...rest} />
    <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
  </IonItem>
);
