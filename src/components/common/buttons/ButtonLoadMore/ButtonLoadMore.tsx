import styles from "./ButtonLoadMore.module.css";

import { Button } from "@/components/common/buttons/Button";

export type ComponentProps = {
  /**
   * Load more data
   */
  handleLoadMore?: () => Promise<void>;
  /**
   * Is loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
};

export const ButtonLoadMore = ({
  handleLoadMore,
  isLoading,
  className,
}: ComponentProps) => {
  return (
    <div
      className={`${styles.loadMoreContainer} ${className} animate__animated animate__fadeIn`}
    >
      <Button
        onClick={handleLoadMore}
        color="secondary"
        isLoading={isLoading}
        className={`${styles.loadMoreBtn}`}
      >
        Cargar Más
      </Button>
    </div>
  );
};
