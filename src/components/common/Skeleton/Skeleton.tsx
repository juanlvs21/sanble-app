import { CSSProperties } from "react";

import styles from "./Skeleton.module.css";

type ComponentProps = {
  /**
   * Skeleton width
   */
  width?: number | string;
  /**
   * Skeleton Height
   */
  height?: number | string;
  /**
   * Skeleton online styles
   */
  style?: CSSProperties;
};

export const Skeleton: React.FC<ComponentProps> = ({
  width,
  height,
  style,
}) => <div className={styles.skeleton} style={{ width, height, ...style }} />;
