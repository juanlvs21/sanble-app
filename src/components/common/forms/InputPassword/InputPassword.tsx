import { useState } from "react";
import { IonButton, IonInput, IonItem } from "@ionic/react";
import { HiOutlineKey, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import { TInput } from "@/types/TForm";

type ComponentProps = TInput;

export const InputPassword: React.FC<ComponentProps> = ({
  placeholder = "Contraseña",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <IonItem fill="outline" className="inputItem">
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
        className="showPassBtn"
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
    </IonItem>
  );
};
