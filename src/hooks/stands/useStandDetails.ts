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
  const { toast } = useToast();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [paginationReviews, setPaginationReviews] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_REVIEWS,
    limit: DEFAULT_LIMIT_REVIEWS,
  });

  const {
    data: stand,
    error: errorDetails,
    isLoading: isLoadingDetails,
    mutate: mutateDetails,
  } = useSWRMutation(
    `/stands/${standID}`,
    async () => await getStandDetailsRequest(standID)
  );

  const {
    data: dataReviews,
    error: errorReviews,
    isLoading: isLoadingReviews,
    mutate: mutateReviews,
  } = useSWRMutation(
    ["/stands", standID, "reviews"],
    async () => await getStandReviewsRequest(standID, paginationReviews)
  );

  const handleMutateReviews = async (mutatePagination: TPagination) => {
    setPaginationReviews(mutatePagination);

    const dataMutate = await mutateReviews(
      async () => await getStandReviewsRequest(standID, mutatePagination)
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

      const { review, standStars } = await saveStandReviewRequest(
        standID,
        data
      );

      setReview(review);

      if (stand) mutateDetails({ ...stand, stars: standStars });

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

  const getIndexPhoto = (photoID: string = "") => {
    const index = stand?.photographs.findIndex(
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
