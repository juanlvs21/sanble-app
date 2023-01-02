import { TiStarFullOutline } from "react-icons/ti";

import styles from "./Stars.module.css";

export type ComponentProps = {
  /**
   * Number of filled stars
   */
  value: number;
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
};

export const Stars: React.FC<ComponentProps> = ({
  value,
  onChange,
  size = 20,
  className = "",
}) => {
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
            className={`${styles.star} ${i < value ? styles.starFull : ""}`}
            size={size}
            onClick={onChange ? () => onChange(i + 1) : undefined}
          />
        ))}
    </div>
  );
};
