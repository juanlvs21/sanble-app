import { FiHeart } from "react-icons/fi";

import { Button } from "@/components/common/buttons/Button";
import { TButton } from "@/types/TComponents";
import styles from "./ButtonFav.module.css";

type ComponentProps = Omit<TButton, "color"> & {
  /**
   * Button Loading
   */
  isLoading?: boolean;
  /**
   * Indicates if the favorite is marked or not
   */
  isActive?: boolean;
};

export const ButtonFav: React.FC<ComponentProps> = ({
  isActive = false,
  className,
  ...rest
}) => (
  <Button
    color={isActive ? "primary" : "medium"}
    className={`${styles.buttonFav} ${className}`}
    spinnerColor={isActive ? "medium" : "primary"}
    spinnerSize={15}
    {...rest}
  >
    <FiHeart className="animate__animated animate__bounceIn" size={22} />
  </Button>
);
