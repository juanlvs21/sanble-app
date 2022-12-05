import { IonButton, IonInput, IonItem, IonNote } from "@ionic/react";
import { FiSearch } from "react-icons/fi";

import { TInput } from "@/types/TComponents";

type ComponentProps = TInput & {
  helper?: string | React.ReactElement;
  helperIsError?: boolean;
};

export const InputSearch: React.FC<ComponentProps> = ({
  inputmode = "search",
  helper,
  helperIsError,
  ...rest
}) => (
  <IonItem fill="outline" className="inputItem">
    <IonInput {...rest} inputmode={inputmode} />
    <IonButton
      slot="end"
      className="itemInputEndIcon"
      fill="clear"
      shape="round"
    >
      <FiSearch size={24} />
    </IonButton>
    <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
  </IonItem>
);
