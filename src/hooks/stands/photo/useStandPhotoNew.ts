import { useNavigate } from "react-router-dom";
import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { uploadStandPhotoRequest } from "@/services";
import { TPhotographForm } from "@/types/TPhotograph";
import { ERoutesName } from "@/types/TRoutes";
import { useStandsRevalidate } from "@/hooks/stands/useStandsRevalidate";
import { mutate } from "swr";

export const useStandPhotoNew = (standID: string) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleRevalidateLists } = useStandsRevalidate(standID);

  const handleUploadPhoto = async (data: TPhotographForm) => {
    presentLoading();

    try {
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      const { photograph } = await uploadStandPhotoRequest(standID, formData);

      if (photograph.isCover) handleRevalidateLists();

      await mutate(`/stands/${standID}`, undefined, { revalidate: true });

      toast("Fotografía publicada con éxito", {
        type: "success",
      });

      navigate(`${ERoutesName.STANDS_LIST}/${standID}/fotos`, {
        state: {
          standID,
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
