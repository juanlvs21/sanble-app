import { Button } from "@/components/common/buttons/Button";
import { TButton } from "@/types/TComponents";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import styles from "./ButtonFav.module.css";

export type ComponentProps = Omit<TButton, "color"> & {
  /**
   * Button Loading
   */
  isLoading?: boolean;
  /**
   * Indicates if the favorite is marked or not
   */
  isActive?: boolean;
  /**
   * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
   * Default: If isActive is true spinnerColor==primary. If isActive is false spinnerColor==medium
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
   * Icon size on the button
   */
  sizeIcon?: number;
  /**
   * Loading spinner color
   * Default: If isActive is true spinnerColor==medium. If isActive is false spinnerColor==primary
   */
  spinnerColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "medium"
    | "dark";
};

export const ButtonFav = ({
  isActive = false,
  sizeIcon = 22,
  color,
  spinnerColor,
  className,
  ...rest
}: ComponentProps) => (
  <Button
    color={color || (isActive ? "primary" : "medium")}
    className={`${styles.buttonFav} ${className}`}
    spinnerColor={spinnerColor || (isActive ? "medium" : "dark")}
    fill="solid"
    {...rest}
  >
    {isActive ? (
      <FaHeart
        className="animate__animated animate__bounceIn"
        size={sizeIcon}
      />
    ) : (
      <FiHeart
        className="animate__animated animate__bounceIn"
        size={sizeIcon}
      />
    )}
  </Button>
);
