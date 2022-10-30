import { CSSProperties } from "react";
import styles from "../Loaders.module.css";

type ComponentProps = {
  /**
   * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
   *
   * @default 'primary'
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "medium"
    | "dark";
  /**
   * Size
   *
   * @default 35
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
  /**
   * Custom className for content component
   */
  className?: string;
};

export const Spinner: React.FC<ComponentProps> = ({
  color = "primary",
  size = 35,
  className = "",
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

  if (center)
    styleContainer = {
      ...styleContainer,
      display: "flex",
    };

  const colorClass = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
    success: styles.success,
    warning: styles.warning,
    danger: styles.danger,
    light: styles.light,
    medium: styles.medium,
    dark: styles.dark,
  };

  return (
    <div
      className={`animate__animated animate__fadeIn ${className}`}
      style={styleContainer}
    >
      <div
        className={`${styles.spinner} ${colorClass[color]}`}
        style={{ width: size, height: size }}
      />
    </div>
  );
};
