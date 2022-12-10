import { TiStarFullOutline } from "react-icons/ti";

import styles from "./Stars.module.css";

export type ComponentProps = {
  /**
   * Number of filled stars
   */
  value: number;
};

export const Stars: React.FC<ComponentProps> = ({ value }) => {
  return (
    <div>
      {Array(value)
        .fill(0)
        .map((_, i) => (
          <TiStarFullOutline
            key={i}
            className={`${styles.star} ${styles.starFull}`}
            size={20}
          />
        ))}
      {Array(5 - value)
        .fill(0)
        .map((_, i) => (
          <TiStarFullOutline key={i} className={styles.star} size={20} />
        ))}
    </div>
  );
};
