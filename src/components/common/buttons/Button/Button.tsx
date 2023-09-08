import { IonButton, IonSpinner } from "@ionic/react";
import { CSSProperties } from "react";

import { TButton } from "@/types/TComponents";

export type ComponentProps = TButton & {
  /**
   * Children element
   */
  children: React.ReactNode[] | React.ReactNode | string;
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
  /**
   * Spinner online styles
   */
  spinnerStyle?: CSSProperties;
  /**
   * Element identifier
   */
  id?: string;
};

export const Button = ({
  children,
  isLoading,
  disabled,
  spinnerStyle,
  spinnerColor = "light",
  ...rest
}: ComponentProps) => (
  <IonButton {...rest} disabled={disabled || isLoading}>
    {isLoading ? <IonSpinner color={spinnerColor} /> : children}
  </IonButton>
);
