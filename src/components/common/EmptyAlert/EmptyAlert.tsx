import { FaHeartBroken } from "react-icons/fa";
import styles from "./EmptyAlert.module.css";

export type ComponentProps = {
  /**
   * Empty message
   *
   * @default "Sin datos"
   */
  message?: string;
  /**
   * Icon message
   *
   * @default <FaHeartBroken size={42} />
   */
  MessageIcon?: JSX.Element;
  /**
   * Custom className for container component
   */
  className?: string;
};

export const EmptyAlert = ({
  MessageIcon = <FaHeartBroken size={42} />,
  message = "Sin datos",
  className = "",
}: ComponentProps) => (
  <div className={`${styles.emptyAlertContainer} ${className}`}>
    {MessageIcon}
    <h1>{message}</h1>
  </div>
);
