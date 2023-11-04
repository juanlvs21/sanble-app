import { TiStarFullOutline } from "react-icons/ti";

import styles from "./Stars.module.css";

export type ComponentProps = {
  /**
   * Number of filled stars
   *
   * @default 0
   */
  value?: number;
  /**
   * onChange event
   */
  onChange?: (value: number) => void;
  /**
   * Size stars icon
   *
   * @default 20
   */
  size?: number;
  /**
   * Custom className for component
   */
  className?: string;
  /**
   * Disable
   */
  disable?: boolean;
};

export const Stars = ({
  onChange,
  value = 0,
  disable,
  size = 20,
  className = "",
}: ComponentProps) => {
  return (
    <div
      className={`${className} animate__animated animate__fadeIn`}
      style={{ height: size }}
    >
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <TiStarFullOutline
            key={i}
            className={`${styles.star} ${i < value ? styles.starFull : ""} ${
              disable ? styles.disable : ""
            }`}
            size={size}
            onClick={onChange && !disable ? () => onChange(i + 1) : undefined}
          />
        ))}
    </div>
  );
};
