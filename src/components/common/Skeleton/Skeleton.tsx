import { CSSProperties } from "react";

import styles from "./Skeleton.module.css";

export type ComponentProps = {
  /**
   * Skeleton width
   */
  width?: number | string;
  /**
   * Skeleton Height
   */
  height?: number | string;
  /**
   * Custom className for content component
   */
  className?: string;
  /**
   * Skeleton online styles
   */
  style?: CSSProperties;
};

export const Skeleton = ({
  width,
  height,
  style,
  className = "",
}: ComponentProps) => (
  <div
    className={`${styles.skeleton} ${className}`}
    style={{ width, height, ...style }}
  />
);
