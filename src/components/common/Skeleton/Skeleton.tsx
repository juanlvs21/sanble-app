import { CSSProperties } from "react";

import styles from "./Skeleton.module.css";

type ComponentProps = {
  /**
   *
   */
  width?: number | string;
  /**
   *
   */
  height?: number | string;
  /**
   *
   */
  style?: CSSProperties;
};

export const Skeleton: React.FC<ComponentProps> = ({
  width,
  height,
  style,
}) => <div className={styles.skeleton} style={{ width, height, ...style }} />;
