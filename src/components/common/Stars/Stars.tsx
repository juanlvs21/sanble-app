import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";

import styles from "./Stars.module.css";

export const Stars: React.FC = () => {
  return (
    <div>
      <TiStarFullOutline className={styles.star} size={20} />
      <TiStarFullOutline className={styles.star} size={20} />
      <TiStarOutline className={styles.star} size={20} />
      <TiStarOutline className={styles.star} size={20} />
      <TiStarOutline className={styles.star} size={20} />
    </div>
  );
};
