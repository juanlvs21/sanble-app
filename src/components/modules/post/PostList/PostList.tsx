import {
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useBoolean } from "usehooks-ts";

import { EmptyList } from "@/components/common/EmptyList";
import { HeaderModal } from "@/components/common/HeaderModal";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/buttons/Button";
import { ButtonLoadMore } from "@/components/common/buttons/ButtonLoadMore";
import { Spinner } from "@/components/common/loaders/Spinner";
import { PostForm } from "@/components/modules/post/PostForm";
import { dayjs } from "@/helpers/time";
import { TPost, TPostForm } from "@/types/TPost";
import styles from "./PostList.module.css";

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
   * Update post
   */
  handleUpdate: (
    values: TPostForm,
    reset: UseFormReset<TPostForm>,
    dismissModal: () => void
  ) => void | Promise<any>;
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
   * Update is loading
   */
  isUpdating?: boolean;
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
  isUpdating,
  showLoadMoreBtn,
  isLoadMore,
  isOwner,
  handleUpdate,
  handleDelete,
  handleLoadMore,
  className,
  scrollPostID,
  scrollRef,
}: ComponentProps) => {
  const [present] = useIonActionSheet();
  const { value: showModalUpdate, toggle: toggleModalUpdate } = useBoolean();
  const [postUpdate, setPostUpdate] = useState<TPost>();
  const postRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const handleOpenMenu = (post: TPost) => {
    present({
      header: "Acciones",
      buttons: [
        {
          text: "Editar Publicación",
          handler: () => {
            setPostUpdate(post);
            toggleModalUpdate();
          },
        },
        {
          text: "Eliminar Publicación",
          handler: () => handleDelete(post.id),
        },
        {
          text: "Cancelar",
          cssClass: "danger-color",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollPostID && postRefs.current[scrollPostID]) {
        postRefs.current[scrollPostID]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 1000);
  }, [scrollPostID, postRefs.current]);

  return (
    <>
      {isLoading && <Spinner className={`${styles.postSpinner}`} center />}
      <ul className={`${styles.postList} ${className}`}>
        {!isLoading && !posts.length && (
          <EmptyList
            title="No hay publicaciones que mostrar"
            className={styles.postsEmpty}
          />
        )}
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
                id={post.id}
                key={post.id}
                className={`${styles.postCard} ${
                  scrollPostID == post.id ? styles.postCardSelect : ""
                } animate__animated animate__fadeIn`}
                ref={(el) => {
                  if (el) postRefs.current[post.id] = el;
                }}
              >
                {isOwner && (
                  <Button
                    size="small"
                    fill="clear"
                    color="secondary"
                    className={`${styles.postClose}`}
                    onClick={() => handleOpenMenu(post)}
                  >
                    <BsThreeDotsVertical size={16} />
                  </Button>
                )}

                <p className={`${styles.postText}`}> {post.text}</p>

                {post.fileId && (
                  <div className={styles.postFileContainer}>
                    <ImageExtended src={post.fileUrl} alt={post.fileName} />
                  </div>
                )}

                <small className={`${styles.postDate}`}>
                  {dayjs(post.creationTime).format("DD/MM/YYYY")}
                </small>
              </li>
            ))}
      </ul>

      {showLoadMoreBtn && (
        <ButtonLoadMore
          handleLoadMore={handleLoadMore}
          isLoading={isLoadMore}
        />
      )}

      <IonModal isOpen={showModalUpdate}>
        <HeaderModal>
          <IonToolbar>
            <IonTitle>Editar Publicación</IonTitle>
            <IonButtons slot="end">
              <Button
                onClick={() => toggleModalUpdate()}
                fill="clear"
                color="medium"
                className={styles.postListModalEditClose}
              >
                <AiOutlineClose size={24} />
              </Button>
            </IonButtons>
          </IonToolbar>
        </HeaderModal>
        <IonContent className={styles.postListModalEditContent}>
          <PostForm
            handleSave={(values, reset) =>
              handleUpdate(values, reset, toggleModalUpdate)
            }
            post={postUpdate}
            isLoading={isUpdating}
          />
        </IonContent>
      </IonModal>
    </>
  );
};
