import { Spinner } from "@/components/common/loaders/Spinner";
import styles from "./SpinnerFullScreen.module.css";

type ComponentProps = {
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
   * Size spinner
   *
   * @default 50
   */
  size?: string | number;
};

export const SpinnerFullScreen: React.FC<ComponentProps> = ({
  show,
  borderRadius,
  color = "primary",
  size = 50,
}) =>
  show ? (
    <div
      className={`${styles.sprinnerFullScren} ${
        show ? styles.showSprinnerFullScren : ""
      } ${
        borderRadius ? styles.showSprinnerBgBorderRadius : ""
      } animate__animated animate__fadeIn`}
    >
      <Spinner size={size} color={color} center />
    </div>
  ) : null;
