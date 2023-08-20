import { RefObject, useEffect, useState } from "react";
import { SwiperRef } from "swiper/react";
import useSWR from "swr";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import {
  getFairDetailsRequest,
  getFairPostsRequest,
  getFairReviewsRequest,
  saveFairPostRequest,
  saveFairReviewRequest,
} from "@/services";
import { TPagination } from "@/types/THttp";
import { TPhotograph } from "@/types/TPhotograph";
import { TReview, TReviewForm } from "@/types/TReview";
import { TPost, TPostForm } from "@/types/TPost";
import { FormikHelpers } from "formik";

const DEFAULT_LAST_INDEX_LIST = 0;
const DEFAULT_LIMIT_LIST = 9;

export const useFairDetails = (
  fairID: string,
  slidesPhotoRef?: RefObject<SwiperRef>
) => {
  const { toast, toastDismiss } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [posts, setPosts] = useState<TPost[]>([]);

  const [isSavingReview, setIsSavingReview] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [activePhoto, setActivePhoto] = useState<TPhotograph>();

  const SWR_KEY_FAIRS_DETAILS = `/fairs/${fairID}`;
  const SWR_KEY_FAIRS_REVIEWS = `/fairs/${fairID}/reviews`;
  const SWR_KEY_FAIRS_POSTS = `/fairs/${fairID}/posts`;

  const {
    data: fair,
    isLoading: isLoadingDetails,
    mutate: mutateDetails,
  } = useSWR(
    SWR_KEY_FAIRS_DETAILS,
    async () => await getFairDetailsRequest(fairID),
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
        toastDismiss(SWR_KEY_FAIRS_DETAILS);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_DETAILS });
      },
    }
  );

  const { isLoading: isLoadingReviews, mutate: mutateReviews } = useSWR(
    SWR_KEY_FAIRS_REVIEWS,
    async () => await getFairReviewsRequest(fairID),
    {
      onSuccess(data) {
        if (data) {
          setReviews(data.list);
          setReview(data.form);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_FAIRS_REVIEWS);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_REVIEWS });
      },
    }
  );

  const { isLoading: isLoadingPosts, mutate: mutatePosts } = useSWR(
    SWR_KEY_FAIRS_POSTS,
    async () => await getFairPostsRequest(fairID),
    {
      onSuccess(data) {
        if (data) {
          setPosts(data.list);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_FAIRS_REVIEWS);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_REVIEWS });
      },
    }
  );

  const handleSaveReview = async (data: TReviewForm) => {
    try {
      setIsSavingReview(true);

      const { review, fairStars } = await saveFairReviewRequest(fairID, data);

      setReview(review);

      if (fair) mutateDetails({ ...fair, stars: fairStars });

      toast("Opinión guardada con éxito", { type: "success" });

      setIsRefresh(true);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSavingReview(false);
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

      await saveFairPostRequest(fairID, formData);

      formikHelpers.resetForm();

      toast("Información publicada con éxito", { type: "success" });

      setIsRefresh(true);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleLoadAll = async () => {
    setIsRefresh(true);
  };

  const handleInfiniteScroll = async () => {
    mutateReviews();
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
    fair,
    activePhoto,
    review,
    reviews,
    isSavingReview,
    isLoadingDetails,
    isLoadingReviews,
    posts,
    isSavingPost,
    isLoadingPosts,
    setActivePhoto,
    handleLoadAll,
    handleInfiniteScroll,
    handleSaveReview,
    handleSavePost,
    handleLoadDetails: mutateDetails,
    getIndexPhoto,
  };
};
