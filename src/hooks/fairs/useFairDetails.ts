import { useEffect, useState } from "react";

import { useToast } from "@/hooks/useToast";
import {
  getFairDetailsRequest,
  getFairReviewsRequest,
  saveFairReviewRequest,
} from "@/services";
import { TFair } from "@/types/TFair";
import { TReview, TReviewForm } from "@/types/TReview";
import { TGetListParams } from "@/types/TRequest";
import { infiteScrollData } from "@/helpers/infiniteScrollData";

const DEFAULT_PAGE_REVIEWS = 1;
const DEFAULT_PER_PAGE_REVIEWS = 10;
const DEFAULT_TOTAL_PAGE_REVIEWS = 0;

export const useFairDetails = (fairID: string, params?: TGetListParams) => {
  const { toast } = useToast();
  const [fair, setFair] = useState<TFair>();
  const [review, setReview] = useState<TReview>();
  const [reviews, setReviews] = useState<TReview[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [pageReviews, setPageReviews] = useState(DEFAULT_PAGE_REVIEWS);
  const [perPageReviews, setPerPageReviews] = useState(
    DEFAULT_PER_PAGE_REVIEWS
  );
  const [totalPagesReviews, setTotalPagesReviews] = useState(
    DEFAULT_TOTAL_PAGE_REVIEWS
  );

  useEffect(() => {
    handleLoadDetails();
    handleLoadReviews();
  }, []);

  const handleLoadDetails = async () => {
    setIsLoading(true);

    try {
      const fairRes = await getFairDetailsRequest(fairID);
      setFair(fairRes);
    } catch (error: any) {
      toast("Error al cargar informacion de la feria", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadReviews = async (params?: TGetListParams) => {
    setIsLoadingReviews(true);

    try {
      const pageReq = params?.page || DEFAULT_PAGE_REVIEWS;
      const perPageReq = params?.perPage || DEFAULT_PER_PAGE_REVIEWS;

      const { form, list, pagination } = await getFairReviewsRequest(fairID, {
        page: pageReq,
        perPage: perPageReq,
      });

      if (pagination.page === DEFAULT_PAGE_REVIEWS) {
        setReviews(infiteScrollData("id", list, []));
      } else setReviews(infiteScrollData("id", list, reviews));

      setReview(form);
      setPageReviews(pagination.page);
      setPerPageReviews(pagination.perPage);
      setTotalPagesReviews(pagination.totalPages);
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
    const nextPage = pageReviews + 1;
    const currentPage = totalPagesReviews;

    if (nextPage <= currentPage) {
      await handleLoadReviews({ page: nextPage, perPage: perPageReviews });
    }
  };

  return {
    fair,
    review,
    reviews,
    isSaving,
    isLoading,
    isLoadingReviews,
    handleLoadDetails,
    handleLoadReviews,
    handleRefreshReviews,
    handleInfiniteReviews,
    handleSaveReview,
  };
};
