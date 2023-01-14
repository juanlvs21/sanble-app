import { IonButton, IonInput, IonItem, IonNote } from "@ionic/react";
import { FiSearch } from "react-icons/fi";

import { TInput } from "@/types/TComponents";

export type ComponentProps = TInput & {
  /**
   * Error content
   */
  helper?: string | React.ReactElement;
  /**
   * Show error
   */
  helperIsError?: boolean;
  /**
   * Custom className for content component
   */
  classNameItem?: string;
};

export const InputSearch = ({
  inputmode = "search",
  classNameItem = "",
  helper,
  helperIsError,
  ...rest
}: ComponentProps) => (
  <IonItem fill="outline" className={`${classNameItem} inputItem withoutStart`}>
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
