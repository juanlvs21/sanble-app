import styles from "./Skeleton.module.css";

type ComponentProps = {
  /**
   * Width skeleton
   *
   * @default "100%"
   */
  width?: number | string;
  /**
   * Height skeleton
   *
   * @default "1em"
   */
  height?: number | string;
  /**
   * Class css container
   */
  className?: string;
};

export const Skeleton: React.FC<ComponentProps> = ({
  width = "100%",
  height = "1em",
  className = "",
}) => (
  <span
    className={`${styles.skeleton} ${className}`}
    style={{ width, height }}
  />
);
