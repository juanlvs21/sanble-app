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

const DEFAULT_LAST_INDEX_REVIEWS = 0;
const DEFAULT_LIMIT_REVIEWS = 9;

export const useStandDetails = (
  standID: string,
  slidesPhotoRef?: RefObject<SwiperRef>
) => {
  const { toast, toastDismiss } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [activePhoto, setActivePhoto] = useState<TPhotograph>();

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
    async () => await getStandReviewsRequest(standID),
    {
      onSuccess(data) {
        if (data) {
          setReviews(data.list);
          setReview(data.form);
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
      setIsRefresh(true);
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadAll = async () => {
    setIsRefresh(true);
  };

  const handleInfiniteReviews = async () => {
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
    activePhoto,
    setActivePhoto,
    handleLoadAll,
    handleInfiniteReviews,
    handleSaveReview,
    handleLoadDetails: mutateDetails,
    getIndexPhoto,
  };
};
