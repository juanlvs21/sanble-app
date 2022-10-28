import { CSSProperties } from "react";
import styles from "../Loaders.module.css";

type ComponentProps = {
  /**
   * Spinner color
   */
  color?: string;
  /**
   * Size
   */
  size?: string | number;
  /**
   * Margin top
   */
  marginTop?: string | number;
  /**
   * Margin bottom
   */
  marginBottom?: string | number;
  /**
   * If true the Spinner will be centered in a full width container
   */
  center?: boolean;
};

export const Spinner: React.FC<ComponentProps> = ({
  color,
  size,
  marginTop,
  marginBottom,
  center,
}) => {
  let styleContainer: CSSProperties = {
    marginTop,
    marginBottom,
    width: "100%",
    justifyContent: "center",
  };

  let styleDot: CSSProperties = { backgroundColor: color };

  if (size)
    styleDot = { ...styleDot, width: size, height: size, borderRadius: size };

  if (center)
    styleContainer = {
      ...styleContainer,
      display: "flex",
      justifyContent: "center",
      width: "100%",
    };

  return (
    <div className="animate__animated animate__fadeIn" style={styleContainer}>
      <span className={styles.spinnerDot} style={styleDot} />
      <span className={styles.spinnerDot} style={styleDot} />
      <span className={styles.spinnerDot} style={styleDot} />
    </div>
  );
};
