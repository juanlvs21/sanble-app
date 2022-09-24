import { IonInput, IonItem, IonNote } from "@ionic/react";

import { TInput } from "@/types/TComponents";

type ComponentProps = TInput & {
  Icon?: React.ReactElement;
  helper?: string | React.ReactElement;
  helperIsError?: boolean;
};

export const Input: React.FC<ComponentProps> = ({
  Icon,
  helper,
  helperIsError,
  ...rest
}) => (
  <IonItem fill="outline" className="inputItem">
    <span slot="start" className="slotIconStart">
      {Icon}
    </span>
    <IonInput {...rest} />
    <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
  </IonItem>
);
