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
  borderRadius?: number | string | true;
};

export const SpinnerFullScreen: React.FC<ComponentProps> = ({
  show,
  borderRadius,
}) => {
  let customStyles: React.CSSProperties = {};

  if (borderRadius) {
    if (borderRadius === true) {
      customStyles.borderRadius = "var(--sanble-border-radius)";
    } else customStyles.borderRadius = borderRadius;
  }

  return show ? (
    <div
      className={`${styles.sprinnerFullScren} ${
        show ? styles.showSprinnerFullScren : ""
      } animate__animated animate__fadeIn`}
      style={customStyles}
    >
      <Spinner />
    </div>
  ) : null;
};
