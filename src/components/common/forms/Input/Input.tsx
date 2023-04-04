import { IonInput, IonItem, IonNote } from "@ionic/react";

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
  };

export const Input = ({
  Icon,
  helper,
  helperIsError,
  ...rest
}: ComponentProps) => (
  <IonItem
    fill="outline"
    className={`inputItem  ${Icon ? "inputWithIcon" : ""}`}
  >
    {Icon && (
      <span slot="start" className="slotIconStart">
        {Icon}
      </span>
    )}
    <IonInput {...rest} />
    <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
  </IonItem>
);
