import { useEffect, useState } from "react";
import useSWRMutation from "swr/immutable";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import {
  getFairDetailsRequest,
  getFairReviewsRequest,
  saveFairReviewRequest,
} from "@/services";
import { TPagination } from "@/types/THttp";
import { TReview, TReviewForm } from "@/types/TReview";

const DEFAULT_LAST_INDEX_REVIEWS = 0;
const DEFAULT_LIMIT_REVIEWS = 9;

export const useFairDetails = (fairID: string) => {
  const { toast, toastDismiss } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [paginationReviews, setPaginationReviews] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_REVIEWS,
    limit: DEFAULT_LIMIT_REVIEWS,
  });

  const SWR_KEY_FAIRS_DETAILS = `/fairs/${fairID}`;
  const SWR_KEY_FAIRS_REVIEWS = `/fairs/${fairID}/reviews`;

  const {
    data: fair,
    isLoading: isLoadingDetails,
    mutate: mutateDetails,
  } = useSWRMutation(
    SWR_KEY_FAIRS_DETAILS,
    async () => await getFairDetailsRequest(fairID),
    {
      onError(error) {
        toastDismiss(SWR_KEY_FAIRS_DETAILS);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_DETAILS });
      },
    }
  );

  const { isLoading: isLoadingReviews, mutate: mutateReviews } = useSWRMutation(
    SWR_KEY_FAIRS_REVIEWS,
    async () => await getFairReviewsRequest(fairID, paginationReviews),
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
        toastDismiss(SWR_KEY_FAIRS_REVIEWS);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_REVIEWS });
      },
    }
  );

  const handleSaveReview = async (data: TReviewForm) => {
    try {
      setIsSaving(true);

      const { review, fairStars } = await saveFairReviewRequest(fairID, data);

      setReview(review);

      if (fair) mutateDetails({ ...fair, stars: fairStars });

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
    const index = fair?.photographs.findIndex(
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
    fair,
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
