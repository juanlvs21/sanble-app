import { IonButton } from "@ionic/react";

import { TButton } from "@/types/TComponents";
import { Spinner } from "@/components/common/loaders/Spinner";

type ComponentProps = TButton & {
  /**
   * Children element
   */
  children: React.ReactElement | React.ReactElement[] | string;
  /**
   * Button Loading
   */
  isLoading?: boolean;
  /**
   * Spinner color
   *
   * @default 'light'
   */
  spinnerColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "medium"
    | "dark";
};

export const Button: React.FC<ComponentProps> = ({
  children,
  isLoading,
  disabled,
  spinnerColor = "light",
  ...rest
}) => (
  <IonButton {...rest} disabled={disabled || isLoading}>
    {isLoading ? <Spinner marginTop="-12px" color={spinnerColor} /> : children}
  </IonButton>
);
