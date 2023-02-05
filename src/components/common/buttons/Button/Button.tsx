import { IonButton } from "@ionic/react";
import { CSSProperties } from "react";

import { Spinner } from "@/components/common/loaders/Spinner";
import { TButton } from "@/types/TComponents";

export type ComponentProps = TButton & {
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
  /**
   * Spinner size (width, height)
   *
   * @default 18
   */
  spinnerSize?: number;
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
  spinnerSize = 25,
  spinnerColor = "light",
  ...rest
}: ComponentProps) => (
  <IonButton {...rest} disabled={disabled || isLoading}>
    {isLoading ? (
      <Spinner
        size={spinnerSize}
        color={spinnerColor}
        style={spinnerStyle}
        center
      />
    ) : (
      children
    )}
  </IonButton>
);
