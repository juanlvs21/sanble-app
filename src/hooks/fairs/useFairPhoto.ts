import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/useToast";
import { uploadFairPhotoRequest } from "@/services";
import { TPhotographForm } from "@/types/TPhotograph";

export const useFairPhoto = (fairID: string) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadPhoto = async (data: TPhotographForm) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      const { photograph } = await uploadFairPhotoRequest(fairID, formData);

      toast("Fotografía publicada con éxito", {
        type: "success",
      });

      navigate(`/app/ferias/foto?n=${photograph.name}`, {
        state: { fairID },
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  return {
    handleUploadPhoto,
    isLoading,
  };
};
