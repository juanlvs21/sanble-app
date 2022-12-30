import { useEffect, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { getFairDetailsRequest, saveFairReviewRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { TReview, TReviewForm } from "@/types/TReview";

export const useFairDetails = (fairID: string) => {
  const { toast } = useToast();
  const [fair, setFair] = useState<TFair>();
  const [review, setReview] = useState<TReview>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (fairID) handleLoad();
  }, []);

  const handleLoad = async () => {
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

  const handleSaveReview = async (data: TReviewForm) => {
    try {
      setIsSaving(true);

      const { review, fairStars } = await saveFairReviewRequest(fairID, data);

      setReview(review);
      setFair((state) => (state ? { ...state, stars: fairStars } : undefined));

      toast("Opinión guardada con éxito", { type: "success" });
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    fair,
    review,
    isSaving,
    isLoading,
    handleLoad,
    handleSaveReview,
  };
};
