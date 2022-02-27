import { FaStar } from "react-icons/fa";

type ComponentProps = {
  /**
   * Number stars (min:0, max:5)
   */
  stars: number;
  /**
   * Star size
   *
   * @default 16
   */
  size?: number;
  /**
   * Star color
   *
   * @default #ff8634
   */
  color?: string;
  /**
   * Space between stars
   *
   * @default 2
   */
  spacing?: number;
  /**
   * Class css container
   */
  className?: string;
};

export const Stars: React.FC<ComponentProps> = ({
  stars,
  size = 16,
  spacing = 2,
  color = "#ff8634",
  className = "",
}) => (
  <div className={`${className}`}>
    <FaStar
      color={stars > 0 ? color : "#bcbcbc"}
      size={size}
      style={{ marginLeft: spacing }}
    />
    <FaStar
      color={stars > 1 ? color : "#bcbcbc"}
      size={size}
      style={{ marginLeft: spacing }}
    />
    <FaStar
      color={stars > 2 ? color : "#bcbcbc"}
      size={size}
      style={{ marginLeft: spacing }}
    />
    <FaStar
      color={stars > 3 ? color : "#bcbcbc"}
      size={size}
      style={{ marginLeft: spacing }}
    />
    <FaStar
      color={stars > 4 ? color : "#bcbcbc"}
      size={size}
      style={{ marginLeft: spacing }}
    />
  </div>
);
