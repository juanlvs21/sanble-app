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
};

export const Button: React.FC<ComponentProps> = ({
  children,
  isLoading,
  disabled,
  ...rest
}) => (
  <IonButton {...rest} disabled={disabled || isLoading}>
    {isLoading ? <Spinner color="#fff" marginTop="-12px" /> : children}
  </IonButton>
);
