import { useState } from "react";
import { IonButton, IonInput, IonItem, IonNote } from "@ionic/react";
import { HiOutlineKey, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import { TInputHelpers } from "@/types/TComponents";

export type ComponentProps = typeof IonInput.defaultProps &
  TInputHelpers & {
    /**
     * ClassName item css
     */
    classNameItem?: string;
  };

export const InputPassword = ({
  placeholder = "Contraseña",
  helper,
  helperIsError,
  classNameItem = "",
  ...rest
}: ComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <IonItem
      fill="outline"
      className={`inputItem inputWithIcon ${classNameItem}`}
    >
      <span slot="start" className="slotIconStart">
        <HiOutlineKey />
      </span>
      <IonInput
        {...rest}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
      />
      <IonButton
        slot="end"
        className="itemInputEndIcon"
        fill="clear"
        shape="round"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <HiOutlineEye size={24} />
        ) : (
          <HiOutlineEyeOff size={24} />
        )}
      </IonButton>
      <IonNote slot={helperIsError ? "error" : "helper"}>{helper}</IonNote>
    </IonItem>
  );
};
