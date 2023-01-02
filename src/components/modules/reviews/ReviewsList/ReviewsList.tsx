import { TReview } from "@/types/TReview";
import styles from "./ReviewsList.module.css";

export type ComponentProps = {
  /**
   * User review with the session logged
   */
  reviews?: TReview[];
  /**
   * Review is loading
   */
  isLoading?: boolean;
};

export const ReviewsList: React.FC<ComponentProps> = () => {
  return <section>ReviewsList</section>;
};
