import { IonChip } from "@ionic/react";

import styles from "./EmptyList.module.css";

export type ComponentProps = {
  /**
   * Title Message
   */
  title: React.ReactElement | React.ReactElement[] | string;
  /**
   * Subtitle Message
   */
  subtitle?: React.ReactElement | React.ReactElement[] | string;

  /**
   * Custom className component
   */
  className?: string;
};

export const EmptyList = ({
  title,
  subtitle,
  className = "",
}: ComponentProps) => (
  <IonChip className={`${styles.emptyMessage} ${className}`} color="primary">
    <h1
      className={`${styles.emptyMessageTitle} ${
        subtitle ? styles.withSubtitle : ""
      }`}
    >
      {title}
    </h1>
    {subtitle && <h6 className={styles.emptyMessageSubtitle}>{subtitle}</h6>}
  </IonChip>
);
