import { ImageExtended } from "@/components/common/ImageExtended";
import { Skeleton } from "@/components/common/Skeleton";
import { TReview } from "@/types/TReview";
import { dayjs } from "@/helpers/time";
import styles from "./ReviewsList.module.css";
import { Stars } from "@/components/common/Stars";

export type ComponentProps = {
  /**
   * User review with the session logged
   */
  reviews?: TReview[];
  /**
   * Review is loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
};

export const ReviewsList = ({
  reviews,
  isLoading,
  className = "",
}: ComponentProps) => {
  return (
    <ul className={`${styles.reviewsList} ${className}`}>
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                width="100%"
                height={110}
                style={{ marginBottom: 30 }}
                className="animate__animated animate__fadeIn"
              />
            ))
        : reviews?.map((review) => (
            <li key={review.id}>
              <div className={styles.reviewOwnerContainer}>
                <ImageExtended
                  src={review?.ownerPhoto}
                  alt={review?.ownerName}
                  classNamePicture={styles.reviewOwnerPhotoContainer}
                  className={styles.reviewOwnerPhoto}
                  skeletonProps={{
                    className: styles.reviewOwnerPhoto,
                  }}
                />
                <div>
                  <h6>
                    {review.ownerName}
                    <span>
                      - {dayjs(review.creationTime).format("DD/MM/YYYY")}
                    </span>
                  </h6>
                  <Stars value={review.stars} />
                </div>
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
    </ul>
  );
};
