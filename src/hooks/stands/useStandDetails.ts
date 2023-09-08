import { RefObject, useEffect, useState } from "react";
import { SwiperRef } from "swiper/react";
import useSWR from "swr";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import {
  getStandDetailsRequest,
  getStandReviewsRequest,
  saveStandReviewRequest,
} from "@/services";
import { TPagination } from "@/types/THttp";
import { TPhotograph } from "@/types/TPhotograph";
import { TReview, TReviewForm } from "@/types/TReview";

const DEFAULT_LAST_INDEX_LIST = 0;
const DEFAULT_LIMIT_LIST = 10;

export const useStandDetails = (
  standID: string,
  slidesPhotoRef?: RefObject<SwiperRef>
) => {
  const { toast, toastDismiss } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoadMoreReviews, setIsLoadMoreReviews] = useState(false);
  const [activePhoto, setActivePhoto] = useState<TPhotograph>();
  const [paginationReviews, setPaginationReviews] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_LIST,
    limit: DEFAULT_LIMIT_LIST,
    total: 0,
  });

  const SWR_KEY_STANDS_DETAILS = `/stands/${standID}`;
  const SWR_KEY_STANDS_REVIEWS = `/stands/${standID}/reviews`;

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

  const handleLoadAll = async () => {
    setPaginationReviews({
      lastIndex: DEFAULT_LAST_INDEX_LIST,
      limit: DEFAULT_LIMIT_LIST,
      total: 0,
    });
    // setPaginationPosts({
    //   lastIndex: DEFAULT_LAST_INDEX_LIST,
    //   limit: DEFAULT_LIMIT_LIST,
    //   total: 0,
    // });
    setIsRefresh(true);
  };

  const handleLoadMoreReviews = async () => {
    setIsLoadMoreReviews(true);
    mutateReviews();
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
      setIsRefresh(false);
    }
  }, [isRefresh]);

  return {
    stand,
    review,
    reviews,
    isSaving,
    isLoadingDetails,
    isLoadingReviews,
    isLoadMoreReviews,
    showLoadMoreReviewBtn:
      paginationReviews.total > DEFAULT_LIMIT_LIST &&
      reviews.length !== paginationReviews.total,
    // showLoadMorePostBtn:
    //   paginationPosts.total > DEFAULT_LIMIT_LIST &&
    //   posts.length !== paginationPosts.total,
    activePhoto,
    setActivePhoto,
    handleLoadAll,
    handleLoadMoreReviews,
    handleSaveReview,
    handleLoadDetails: mutateDetails,
    getIndexPhoto,
  };
};
