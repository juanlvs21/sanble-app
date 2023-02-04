import { useState } from "react";

import { useToast } from "@/hooks/useToast";
import { uploadFairPhotoRequest } from "@/services";
import { TPhotographForm } from "@/types/TPhotograph";

export const useFairPhoto = (fairID: string) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadPhoto = async (data: TPhotographForm) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      const { photograph } = await uploadFairPhotoRequest(fairID, formData);
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
