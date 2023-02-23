import { useEffect, useState } from "react";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import {
  getFairDetailsRequest,
  getFairReviewsRequest,
  saveFairReviewRequest,
} from "@/services";
import { TFair } from "@/types/TFair";
import { TGetListParams } from "@/types/TRequest";
import { TReview, TReviewForm } from "@/types/TReview";

const DEFAULT_LAST_INDEX_REVIEWS = 0;
const DEFAULT_LIMIT_REVIEWS = 9;

export const useFairDetails = (fairID: string) => {
  const { toast, toastDismiss } = useToast();
  const [fair, setFair] = useState<TFair>();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [lastIndexReviews, setLastIndexReviews] = useState(
    DEFAULT_LAST_INDEX_REVIEWS
  );
  const [limitReviews, setLimitReviews] = useState(DEFAULT_LIMIT_REVIEWS);

  const handleLoadDetails = async () => {
    setIsLoading(true);
    try {
      const fairRes = await getFairDetailsRequest(fairID);
      setFair(fairRes);
    } catch (error) {
      toastDismiss();
      toast(error, {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadReviews = async (params?: TGetListParams) => {
    setIsLoadingReviews(true);

    try {
      const lastIndexReq = params?.lastIndex || DEFAULT_LAST_INDEX_REVIEWS;
      const limitReq = params?.limit || DEFAULT_LIMIT_REVIEWS;

      const { form, list, pagination } = await getFairReviewsRequest(fairID, {
        lastIndex: lastIndexReq,
        limit: limitReq,
      });

      const newList = infiteScrollData(
        "id",
        list,
        lastIndexReq === DEFAULT_LAST_INDEX_REVIEWS ? [] : reviews
      );

      setReviews(newList);
      setReview(form);
      setLastIndexReviews(pagination.lastIndex);
      setLimitReviews(pagination.limit);
    } catch (error: any) {
      toast("Error al cargar el listado de opiniones", {
        type: "error",
      });
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleSaveReview = async (data: TReviewForm) => {
    try {
      setIsSaving(true);

      const { review, fairStars } = await saveFairReviewRequest(fairID, data);

      setReview(review);
      setFair((state) => (state ? { ...state, stars: fairStars } : undefined));

      toast("Opinión guardada con éxito", { type: "success" });

      handleLoadReviews();
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefreshReviews = async () => {
    await Promise.all([handleLoadDetails(), handleLoadReviews()]);
  };

  const handleInfiniteReviews = async () => {
    await handleLoadReviews({
      lastIndex: lastIndexReviews,
      limit: limitReviews,
    });
  };

  const handleLoadAll = () => {
    handleLoadDetails();
    handleLoadReviews();
  };

  useEffect(() => {
    handleLoadAll();
  }, []);

  return {
    fair,
    review,
    reviews,
    isSaving,
    isLoading,
    isLoadingReviews,
    handleLoadAll,
    handleLoadDetails,
    handleLoadReviews,
    handleRefreshReviews,
    handleInfiniteReviews,
    handleSaveReview,
  };
};
