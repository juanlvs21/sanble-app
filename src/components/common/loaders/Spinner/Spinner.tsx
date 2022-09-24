import { CSSProperties } from "react";
import styles from "../Loaders.module.css";

type ComponentProps = {
  color?: string;
  size?: string | number;
  marginTop?: string | number;
};

export const Spinner: React.FC<ComponentProps> = ({
  color,
  size,
  marginTop,
}) => {
  let styleContainer: CSSProperties = { marginTop };
  let styleDot: CSSProperties = { backgroundColor: color };

  if (size)
    styleDot = { ...styleDot, width: size, height: size, borderRadius: size };

  return (
    <span style={styleContainer}>
      <span className={styles.spinnerDot} style={styleDot} />
      <span className={styles.spinnerDot} style={styleDot} />
      <span className={styles.spinnerDot} style={styleDot} />
    </span>
  );
};
