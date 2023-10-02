import { dayjs } from "@/helpers/time";
import { TPost } from "@/types/TPost";
import { AiOutlineClose } from "react-icons/ai";

import { ImageExtended } from "@/components/common/ImageExtended";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { Spinner } from "@/components/common/loaders/Spinner";
import styles from "./PostList.module.css";
import { RefObject } from "react";

export type ComponentProps = {
  /**
   * Posts
   */
  posts: TPost[];
  /**
   * Is Owner
   */
  isOwner: boolean;
  /**
   * Load more data
   */
  handleLoadMore: () => Promise<void>;
  /**
   * Delete post
   */
  handleDelete: (postID: string) => Promise<void>;
  /**
   * Show button load more
   */
  showLoadMoreBtn?: boolean;
  /**
   * Loading button load more
   */
  isLoadMore?: boolean;
  /**
   * Review is loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
  /**
   * ID post scroll to
   */
  scrollPostID?: string | null;
  /**
   * Ref scroll to
   */
  scrollRef?: RefObject<any>;
};

export const PostList = ({
  posts,
  isLoading,
  showLoadMoreBtn,
  isLoadMore,
  isOwner,
  handleDelete,
  handleLoadMore,
  className,
  scrollPostID,
  scrollRef,
}: ComponentProps) => {
  return (
    <>
      {isLoading && <Spinner className={`${styles.postSpinner}`} center />}
      <ul className={`${styles.postList} ${className}`}>
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
          : posts.map((post) => (
              <li
                key={post.id}
                className={`${styles.postCard} ${
                  scrollPostID === post.id ? styles.postCardSelect : ""
                } animate__animated animate__fadeIn`}
                ref={scrollPostID === post.id ? scrollRef : undefined}
              >
                {isOwner && (
                  <Button
                    size="small"
                    fill="clear"
                    color="secondary"
                    className={`${styles.postClose}`}
                    onClick={() => handleDelete(post.id)}
                  >
                    <AiOutlineClose size={16} />
                  </Button>
                )}

                <p className={`${styles.postText}`}> {post.text}</p>

                <small className={`${styles.postDate}`}>
                  {dayjs(post.creationTime).format("DD/MM/YYYY")}
                </small>

                {post.fileId && (
                  <div className={styles.postFileContainer}>
                    <ImageExtended src={post.fileUrl} alt={post.fileName} />
                  </div>
                )}
              </li>
            ))}
      </ul>

      {showLoadMoreBtn && (
        <ButtonLoadMore
          handleLoadMore={handleLoadMore}
          isLoading={isLoadMore}
        />
      )}
    </>
  );
};
