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
};

export const SpinnerFullScreen: React.FC<ComponentProps> = ({
  show,
  borderRadius,
}) =>
  show ? (
    <div
      className={`${styles.sprinnerFullScren} ${
        show ? styles.showSprinnerFullScren : ""
      } ${
        borderRadius ? styles.showSprinnerBgBorderRadius : ""
      } animate__animated animate__fadeIn`}
    >
      <Spinner />
    </div>
  ) : null;
