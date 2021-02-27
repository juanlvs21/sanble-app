import React, { useState } from "react";
import { IonInput, IonIcon } from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

// Styles
import styles from "./Forms.module.css";

interface ContainerProps {
  name: string;
  disabled?: boolean;
  value: string;
  onIonChange: any;
  onIonBlur?: any;
}

const InputPassword: React.FC<ContainerProps> = ({
  name,
  disabled,
  value,
  onIonChange,
  onIonBlur,
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleToggleShowPass = () => setShowPass(!showPass);

  return (
    <div className={styles.input_password_container}>
      <IonInput
        type={showPass ? "text" : "password"}
        name={name}
        disabled={disabled}
        onIonChange={onIonChange}
        onIonBlur={onIonBlur}
        value={value}
      />
      <IonIcon
        icon={showPass ? eyeOutline : eyeOffOutline}
        className={styles.input_password_icon}
        onClick={handleToggleShowPass}
      />
    </div>
  );
};

export default InputPassword;
