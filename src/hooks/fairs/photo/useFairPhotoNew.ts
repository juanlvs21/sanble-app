import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/useToast";
import { uploadFairPhotoRequest } from "@/services";
import { TPhotographForm } from "@/types/TPhotograph";
import { ERoutesName } from "@/types/TRoutes";
import { useFairPhotoRevalidate } from "@/hooks/fairs/useFairPhotoRevalidate";

export const useFairPhotoNew = (fairID: string) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleRevalidateUpload } = useFairPhotoRevalidate(fairID);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);

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

      await handleRevalidateUpload(photograph);

      navigate(`${ERoutesName.FAIRS_LIST}/${fairID}/foto/${photograph.id}`, {
        state: {
          fairID,
          photoID: photograph.id,
        },
        replace: true,
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (isDeletingPhoto) setIsDeletingPhoto(false);
  }, [isDeletingPhoto]);

  return {
    isLoading: isSubmit || isDeletingPhoto,
    handleUploadPhoto,
  };
};
