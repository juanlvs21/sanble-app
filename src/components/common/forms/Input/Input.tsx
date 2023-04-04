import type { IonInput as IonInputType } from "@ionic/core/components";
import { IonInput, IonItem, IonNote } from "@ionic/react";

import { TInputHelpers } from "@/types/TComponents";

export type ComponentProps = IonInputType &
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
