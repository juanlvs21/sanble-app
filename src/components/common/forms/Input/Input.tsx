import { IonInput, IonItem } from "@ionic/react";

import { TInput } from "@/types/TForm";

type ComponentProps = TInput & {
  Icon?: React.ReactElement;
};

export const Input: React.FC<ComponentProps> = ({ Icon, ...rest }) => (
  <IonItem fill="outline" className="inputItem">
    <span slot="start" className="slotIconStart">
      {Icon}
    </span>
    <IonInput {...rest} />
  </IonItem>
);
