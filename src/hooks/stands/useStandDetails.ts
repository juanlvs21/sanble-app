import { useIonAlert, useIonLoading } from "@ionic/react";
import { FormikHelpers } from "formik";
import { RefObject, useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { SwiperRef } from "swiper/react";
import useSWR from "swr";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import {
  deleteStandPostRequest,
  getStandDetailsRequest,
  getStandPostsRequest,
  getStandReviewsRequest,
  saveStandPostRequest,
  saveStandReviewRequest,
  updateStandPostRequest,
} from "@/services";
import { TPagination } from "@/types/THttp";
import { TPhotograph } from "@/types/TPhotograph";
import { TPost, TPostForm } from "@/types/TPost";
import { TProductForm } from "@/types/TProduct";
import { TReview, TReviewForm } from "@/types/TReview";

const DEFAULT_LAST_INDEX_LIST = 0;
const DEFAULT_LIMIT_LIST = 10;

export const useStandDetails = (
  standID: string,
  slidesPhotoRef?: RefObject<SwiperRef>
) => {
  const [presentAlert] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast, toastDismiss } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoadMoreReviews, setIsLoadMoreReviews] = useState(false);
  const [activePhoto, setActivePhoto] = useState<TPhotograph>();
  const [isLoadMorePosts, setIsLoadMorePosts] = useState(false);
  const [paginationReviews, setPaginationReviews] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_LIST,
    limit: DEFAULT_LIMIT_LIST,
    total: 0,
  });
  const [paginationPosts, setPaginationPosts] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_LIST,
    limit: DEFAULT_LIMIT_LIST,
    total: 0,
  });

  const SWR_KEY_STANDS_DETAILS = `/stands/${standID}`;
  const SWR_KEY_STANDS_REVIEWS = `/stands/${standID}/reviews`;
  const SWR_KEY_STANDS_POSTS = `/stands/${standID}/posts`;

  const {
    data: stand,
    isLoading: isLoadingDetails,
    mutate: mutateDetails,
  } = useSWR(
    SWR_KEY_STANDS_DETAILS,
    async () => await getStandDetailsRequest(standID),
    {
      onSuccess(data) {
        setTimeout(() => {
          if (data && activePhoto && slidesPhotoRef) {
            slidesPhotoRef.current?.swiper?.slideTo(
              getIndexPhoto(activePhoto.id, data.photographs),
              0
            );
          }
        }, 100);
      },
      onError(error) {
        toastDismiss(SWR_KEY_STANDS_DETAILS);
        toast(error, { type: "error", toastId: SWR_KEY_STANDS_DETAILS });
      },
    }
  );

  const { isLoading: isLoadingReviews, mutate: mutateReviews } = useSWR(
    SWR_KEY_STANDS_REVIEWS,
    async () => await getStandReviewsRequest(standID, paginationReviews),
    {
      onSuccess(data) {
        if (data) {
          const newList =
            paginationReviews.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === DEFAULT_LAST_INDEX_LIST
                    ? []
                    : reviews
                )
              : data.list;

          setReviews(newList);
          setReview(data.form);
          setPaginationReviews(data.pagination);
          setIsLoadMoreReviews(false);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_STANDS_REVIEWS);
        toast(error, { type: "error", toastId: SWR_KEY_STANDS_REVIEWS });
      },
    }
  );

  const {
    isLoading: isLoadingPosts,
    isValidating: isValidatingPosts,
    mutate: mutatePosts,
  } = useSWR(
    SWR_KEY_STANDS_POSTS,
    async () => await getStandPostsRequest(standID, paginationPosts),
    {
      onSuccess(data) {
        if (data) {
          const newList =
            paginationPosts.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === DEFAULT_LAST_INDEX_LIST
                    ? []
                    : posts
                )
              : data.list;

          setPosts(newList);
          setPaginationPosts(data.pagination);
          setIsLoadMorePosts(false);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_STANDS_POSTS);
        toast(error, { type: "error", toastId: SWR_KEY_STANDS_POSTS });
      },
    }
  );

  const handleSaveReview = async (data: TReviewForm) => {
    try {
      setIsSaving(true);

      const { review, standStars } = await saveStandReviewRequest(
        standID,
        data
      );

      setReview(review);

      if (stand) mutateDetails({ ...stand, stars: standStars });

      toast("Opinión guardada con éxito", { type: "success" });

      setPaginationReviews({
        lastIndex: DEFAULT_LAST_INDEX_LIST,
        limit: DEFAULT_LIMIT_LIST,
        total: 0,
      });

      setIsRefresh(true);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePost = async (
    data: TPostForm,
    formikHelpers: FormikHelpers<TPostForm>
  ) => {
    try {
      setIsSavingPost(true);

      const formData = new FormData();

      formData.append("text", data.text);
      if (data.image) formData.append("image", data.image);

      await saveStandPostRequest(standID, formData);

      formikHelpers.resetForm();

      toast("Información publicada con éxito", { type: "success" });

      setPaginationPosts({
        lastIndex: DEFAULT_LAST_INDEX_LIST,
        limit: DEFAULT_LIMIT_LIST,
        total: 0,
      });

      setIsRefresh(true);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleUpdatePost = async (
    data: TPostForm,
    formikHelpers: FormikHelpers<TPostForm>,
    dismissModal: () => void
  ) => {
    try {
      if (data.id) {
        setIsUpdatingPost(true);

        const formData = new FormData();

        formData.append("text", data.text);
        if (data.image) formData.append("image", data.image);

        await updateStandPostRequest(standID, data.id, formData);

        formikHelpers.resetForm();

        toast("Información editada con éxito", { type: "success" });

        setPaginationPosts({
          lastIndex: DEFAULT_LAST_INDEX_LIST,
          limit: DEFAULT_LIMIT_LIST,
          total: 0,
        });

        dismissModal();

        setIsRefresh(true);
      }
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsUpdatingPost(false);
    }
  };

  const handleDeletePost = async (postID: string) => {
    presentAlert({
      header: "¿Estás seguro de eliminar permanentemente esta publicación?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          role: "confirm",
          handler: async () => {
            try {
              presentLoading();

              await deleteStandPostRequest(standID, postID);

              setPaginationPosts({
                lastIndex: DEFAULT_LAST_INDEX_LIST,
                limit: DEFAULT_LIMIT_LIST,
                total: 0,
              });

              setIsRefresh(true);

              toast("Publicación eliminada con éxito", { type: "success" });
            } catch (error) {
              toast(error, { type: "error" });
            } finally {
              dismissLoading();
            }
          },
        },
      ],
    });
  };

  const handleSaveProduct = async (
    data: TProductForm,
    reset: UseFormReset<TProductForm>
  ) => {
    try {
      setIsSavingProduct(true);

      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("amount", data.amount);
      formData.append("currency", data.currency);
      if (data.type) formData.append("type", data.type);
      if (data.image) formData.append("image", data.image);

      // await saveStandPostRequest(standID, formData);

      reset();

      toast("Producto guardado con éxito", { type: "success" });

      // setPaginationPosts({
      //   lastIndex: DEFAULT_LAST_INDEX_LIST,
      //   limit: DEFAULT_LIMIT_LIST,
      //   total: 0,
      // });

      // setIsRefresh(true);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleLoadAll = async () => {
    setPaginationReviews({
      lastIndex: DEFAULT_LAST_INDEX_LIST,
      limit: DEFAULT_LIMIT_LIST,
      total: 0,
    });
    setPaginationPosts({
      lastIndex: DEFAULT_LAST_INDEX_LIST,
      limit: DEFAULT_LIMIT_LIST,
      total: 0,
    });
    setIsRefresh(true);
  };

  const handleLoadMoreReviews = async () => {
    setIsLoadMoreReviews(true);
    mutateReviews();
  };

  const handleLoadMorePost = async () => {
    setIsLoadMorePosts(true);
    mutatePosts();
  };

  const getIndexPhoto = (
    photoID: string = "",
    photographs: TPhotograph[] = []
  ) => {
    const index = photographs.findIndex(
      (photoFilter) => photoFilter.id === photoID
    );

    return index || 0;
  };

  useEffect(() => {
    if (isRefresh) {
      mutateDetails();
      mutateReviews();
      mutatePosts();
      setIsRefresh(false);
    }
  }, [isRefresh]);

  return {
    stand,
    review,
    reviews,
    posts,
    isSaving,
    isSavingPost,
    isSavingProduct,
    isUpdatingPost,
    isLoadingDetails,
    isLoadingReviews,
    isLoadMoreReviews,
    isLoadMorePosts,
    isLoadingPosts: isLoadingPosts || isValidatingPosts,
    showLoadMoreReviewBtn:
      paginationReviews.total > DEFAULT_LIMIT_LIST &&
      reviews.length !== paginationReviews.total,
    showLoadMorePostBtn:
      paginationPosts.total > DEFAULT_LIMIT_LIST &&
      posts.length !== paginationPosts.total,
    activePhoto,
    setActivePhoto,
    handleLoadAll,
    handleLoadMoreReviews,
    handleLoadMorePost,
    handleSaveReview,
    handleSavePost,
    handleUpdatePost,
    handleDeletePost,
    handleSaveProduct,
    handleLoadDetails: mutateDetails,
    getIndexPhoto,
  };
};
