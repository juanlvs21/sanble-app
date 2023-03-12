import { useNavigate } from "react-router-dom";
import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { uploadFairPhotoRequest } from "@/services";
import { TPhotographForm } from "@/types/TPhotograph";
import { ERoutesName } from "@/types/TRoutes";
import { useFairsRevalidate } from "@/hooks/fairs/useFairsRevalidate";

export const useFairPhotoNew = (fairID: string) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleRevalidateAll } = useFairsRevalidate(fairID);

  const handleUploadPhoto = async (data: TPhotographForm) => {
    presentLoading();

    try {
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      const { photograph } = await uploadFairPhotoRequest(fairID, formData);

      toast("Fotografía publicada con éxito", {
        type: "success",
      });

      handleRevalidateAll();

      navigate(`${ERoutesName.FAIRS_LIST}/${fairID}/fotos`, {
        state: {
          fairID,
          photoActiveID: photograph.id,
        },
        replace: true,
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      dismissLoading();
    }
  };

  return {
    handleUploadPhoto,
  };
};
