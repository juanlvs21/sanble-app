import { IonSpinner } from "@ionic/react";
import styles from "./SpinnerFullScreen.module.css";

export type ComponentProps = {
  /**
   * If true, the spinner will be show full screen
   */
  show: boolean;
  /**
   * Border radios background
   */
  borderRadius?: boolean;
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
   * Custom className for content component
   */
  className?: string;
};

export const SpinnerFullScreen = ({
  show,
  borderRadius,
  color,
  className = "",
}: ComponentProps) =>
  show ? (
    <div
      className={`${styles.sprinnerFullScren} ${
        show ? styles.showSprinnerFullScren : ""
      } ${
        borderRadius ? styles.showSprinnerBgBorderRadius : ""
      } ${className} animate__animated animate__fadeIn`}
    >
      <IonSpinner color={color} />
    </div>
  ) : null;
