import { useIonLoading } from "@ionic/react";

import { useFairsRevalidate } from "@/hooks/fairs/useFairsRevalidate";
import { useToast } from "@/hooks/useToast";
import { deleteFairPhotoRequest } from "@/services";
import { mutate } from "swr";

export const useFairPhotoDelete = (fairID: string) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();
  const { handleRevalidateAll } = useFairsRevalidate(fairID);

  const handleDeletePhoto = async (photoID: string, callback: () => void) => {
    presentLoading();

    try {
      await deleteFairPhotoRequest(fairID, photoID);

      handleRevalidateAll();

      toast("Fotografía eliminada con éxito", {
        type: "success",
      });

      callback();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      dismissLoading();
    }
  };

  return {
    handleDeletePhoto,
  };
};
