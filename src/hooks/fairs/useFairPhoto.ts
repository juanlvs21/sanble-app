import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/useToast";
import {
  getFairPhotoRequest,
  updateFairPhotoRequest,
  uploadFairPhotoRequest,
} from "@/services";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";

export const useFairPhoto = (fairID: string) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [details, setDetails] = useState<TPhotograph>();

  const handleGetPhoto = async (photoID: string) => {
    setIsLoading(true);

    try {
      const { photograph } = await getFairPhotoRequest(fairID, photoID);
      setDetails(photograph);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadPhoto = async (data: TPhotographForm) => {
    setIsSubmit(true);

    try {
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      const { photograph } = await uploadFairPhotoRequest(fairID, formData);

      toast("Fotografía publicada con éxito", {
        type: "success",
      });

      navigate(`/app/ferias/${fairID}foto?n=${photograph.id}`);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  const handleUpdatePhoto = async (data: TPhotographForm) => {
    setIsSubmit(true);

    try {
      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      if (data.image) {
        formData.append("image", data.image);
      }

      const { photograph } = await updateFairPhotoRequest(
        fairID,
        data.id,
        formData
      );

      toast("Fotografía actualizada con éxito", {
        type: "success",
      });

      await handleGetPhoto(photograph.id);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  return {
    isLoading,
    isSubmit,
    details,
    handleUploadPhoto,
    handleGetPhoto,
    handleUpdatePhoto,
  };
};
