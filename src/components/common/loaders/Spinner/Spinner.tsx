import { CSSProperties } from "react";

import { TColor } from "@/types/TComponents";
import styles from "../Loaders.module.css";

export type ComponentProps = {
  /**
   * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
   *
   * @default 'primary'
   */
  color?: TColor;
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
  /**
   * Spinner online styles
   */
  style?: CSSProperties;
};

export const Spinner = ({
  color = "primary",
  size = 35,
  className = "",
  style,
  marginTop,
  marginBottom,
  center,
}: ComponentProps) => {
  let styleContainer: CSSProperties = {
    marginTop,
    marginBottom,
    width: "100%",
    justifyContent: "center",
    ...style,
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
      className={`animate__animated animate__bounceIn ${className}`}
      style={styleContainer}
    >
      <span
        className={`${styles.spinner} ${colorClass[color]}`}
        style={{ width: size, height: size }}
      />
    </div>
  );
};
