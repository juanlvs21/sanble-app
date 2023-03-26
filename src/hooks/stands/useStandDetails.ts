import { useEffect, useState } from "react";
import useSWRMutation from "swr/immutable";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import {
  getStandDetailsRequest,
  getStandReviewsRequest,
  saveStandReviewRequest,
} from "@/services";
import { TPagination } from "@/types/THttp";
import { TReview, TReviewForm } from "@/types/TReview";

const DEFAULT_LAST_INDEX_REVIEWS = 0;
const DEFAULT_LIMIT_REVIEWS = 9;

export const useStandDetails = (standID: string) => {
  const { toast, toastDismiss } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [paginationReviews, setPaginationReviews] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_REVIEWS,
    limit: DEFAULT_LIMIT_REVIEWS,
  });

  const SWR_KEY_STANDS_DETAILS = `/stands/${standID}`;
  const SWR_KEY_STANDS_REVIEWS = `/stands/${standID}/reviews`;

  const {
    data: stand,
    error: errorDetails,
    isLoading: isLoadingDetails,
    mutate: mutateDetails,
  } = useSWRMutation(
    SWR_KEY_STANDS_DETAILS,
    async () => await getStandDetailsRequest(standID),
    {
      onError(error) {
        toastDismiss(SWR_KEY_STANDS_DETAILS);
        toast(error, { type: "error", toastId: SWR_KEY_STANDS_DETAILS });
      },
    }
  );

  const {
    data: dataReviews,
    error: errorReviews,
    isLoading: isLoadingReviews,
    mutate: mutateReviews,
  } = useSWRMutation(
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
                  data.pagination.lastIndex === DEFAULT_LAST_INDEX_REVIEWS
                    ? []
                    : reviews
                )
              : data.list;

          setReviews(newList);
          setReview(data.form);
          setPaginationReviews(data.pagination);
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
        lastIndex: DEFAULT_LAST_INDEX_REVIEWS,
        limit: DEFAULT_LIMIT_REVIEWS,
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
      lastIndex: DEFAULT_LAST_INDEX_REVIEWS,
      limit: DEFAULT_LIMIT_REVIEWS,
    });
    setIsRefresh(true);
  };

  const handleInfiniteReviews = async () => {
    mutateReviews();
  };

  const getIndexPhoto = (photoID: string = "") => {
    const index = stand?.photographs.findIndex(
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
    handleLoadAll,
    handleInfiniteReviews,
    handleSaveReview,
    handleLoadDetails: mutateDetails,
    getIndexPhoto,
  };
};
