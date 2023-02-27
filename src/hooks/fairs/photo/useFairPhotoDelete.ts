import { useEffect, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { deleteFairPhotoRequest } from "@/services";
import { useFairPhotoRevalidate } from "@/hooks/fairs/useFairPhotoRevalidate";

export const useFairPhotoDelete = (fairID: string) => {
  const { toast } = useToast();
  const { handleRevalidateDelete } = useFairPhotoRevalidate(fairID);

  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePhoto = async (photoID: string, callback: () => void) => {
    setIsLoading(true);
    try {
      const { photographID, photographCover } = await deleteFairPhotoRequest(
        fairID,
        photoID
      );

      toast("Fotografía eliminada con éxito", {
        type: "success",
      });

      await handleRevalidateDelete(photographID, photographCover);

      setIsDeletingPhoto(true);

      callback();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDeletingPhoto) {
      setIsDeletingPhoto(false);
    }
  }, [isDeletingPhoto]);

  return {
    isDeletingPhoto: isLoading ?? isDeletingPhoto,
    handleDeletePhoto,
  };
};
