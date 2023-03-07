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
  const { toast } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [paginationReviews, setPaginationReviews] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_REVIEWS,
    limit: DEFAULT_LIMIT_REVIEWS,
  });

  const {
    data: fair,
    error: errorDetails,
    isLoading: isLoadingDetails,
    mutate: mutateDetails,
  } = useSWRMutation(
    `/fairs/${fairID}`,
    async () => await getFairDetailsRequest(fairID)
  );

  const {
    data: dataReviews,
    error: errorReviews,
    isLoading: isLoadingReviews,
    mutate: mutateReviews,
  } = useSWRMutation(
    ["/fairs", fairID, "reviews"],
    async () => await getFairReviewsRequest(fairID, paginationReviews)
  );

  const handleMutateReviews = async (mutatePagination: TPagination) => {
    setPaginationReviews(mutatePagination);

    const dataMutate = await mutateReviews(
      async () => await getFairReviewsRequest(fairID, mutatePagination)
    );

    if (dataMutate) {
      const newList = infiteScrollData(
        "id",
        dataMutate.list,
        dataMutate.pagination.lastIndex === DEFAULT_LAST_INDEX_REVIEWS
          ? []
          : reviews
      );

      setReviews(newList);
      setPaginationReviews(dataMutate.pagination);
    }
  };

  const handleSaveReview = async (data: TReviewForm) => {
    try {
      setIsSaving(true);

      const { review, fairStars } = await saveFairReviewRequest(fairID, data);

      setReview(review);

      if (fair) mutateDetails({ ...fair, stars: fairStars });

      toast("Opinión guardada con éxito", { type: "success" });

      handleMutateReviews({
        lastIndex: DEFAULT_LAST_INDEX_REVIEWS,
        limit: DEFAULT_LIMIT_REVIEWS,
      });
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadAll = async () => {
    await Promise.all([mutateDetails(), mutateReviews()]);
  };

  const handleInfiniteReviews = async () => {
    await handleMutateReviews({
      lastIndex: paginationReviews.lastIndex,
      limit: paginationReviews.limit,
    });
  };

  const getIndexPhoto = (photoID: string) => {
    const index = fair?.photographs.findIndex(
      (photoFilter) => photoFilter.id === photoID
    );

    return index || 0;
  };

  useEffect(() => {
    if (!reviews.length && dataReviews && !errorReviews) {
      setReview(dataReviews.form);
      setReviews(dataReviews.list);
      setPaginationReviews(dataReviews.pagination);
    }
  }, [dataReviews]);

  useEffect(() => {
    if (errorReviews) {
      toast(errorReviews, {
        type: "error",
      });
    }
  }, [errorReviews]);

  useEffect(() => {
    if (errorDetails) {
      toast(errorDetails, { type: "error" });
    }
  }, [errorDetails]);

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
