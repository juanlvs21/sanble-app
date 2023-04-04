import { IonHeader } from "@ionic/react";
import { DOMAttributes } from "react";
import { IonicReactProps } from "@ionic/react/dist/types/components/IonicReactProps";

import { useApp } from "@/hooks/useApp";
import styles from "./HeaderModal.module.css";

export type ComponentProps = IonicReactProps &
  DOMAttributes<HTMLIonHeaderElement> & {
    /**
     * Children element
     */
    children: React.ReactElement | React.ReactElement[] | string;
  };

export const HeaderModal = ({
  children,
  className,
  ...rest
}: ComponentProps) => {
  const { isCapacitor } = useApp();

  return (
    <IonHeader
      className={`${className} ${isCapacitor ? styles.headerCapacitor : ""}`}
      {...rest}
    >
      {children}
    </IonHeader>
  );
};
