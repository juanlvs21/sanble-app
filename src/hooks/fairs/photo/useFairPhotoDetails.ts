import { useIonLoading } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/immutable";

import { useFairPhotoRevalidate } from "@/hooks/fairs/useFairRevalidate";
import { useToast } from "@/hooks/useToast";
import { getFairPhotoRequest, updateFairPhotoRequest } from "@/services";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";

export const useFairPhotoDetails = (fairID: string, photoID: string) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();
  const { handleRevalidateDetails, handleRevalidateAll } =
    useFairPhotoRevalidate(fairID);

  const modalRef = useRef<HTMLIonModalElement>(null);
  const [photograph, setPhotograph] = useState<TPhotograph>();
  const [ownerID, setOwnerID] = useState<string>();
  const [isUpdate, setIsUpdate] = useState(false);

  const { data, error, isLoading, mutate } = useSWRMutation(
    `/fairs/${fairID}/photograph/${photoID}`,
    async () => await getFairPhotoRequest(fairID, photoID)
  );

  const handleUpdatePhoto = async (data: TPhotographForm) => {
    presentLoading();
    setIsUpdate(true);

    try {
      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      if (data.image) formData.append("image", data.image);

      const { photograph: photographRes } = await updateFairPhotoRequest(
        fairID,
        data.id,
        formData
      );

      if (photographRes.isCover) handleRevalidateAll();
      else handleRevalidateDetails();

      await mutate();

      toast("Fotografía actualizada con éxito", {
        type: "success",
      });

      if (modalRef?.current) modalRef?.current?.dismiss();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsUpdate(false);
      dismissLoading();
    }
  };

  useEffect(() => {
    if (data && !error) {
      setPhotograph(data.photograph);
      setOwnerID(data.ownerID);
    }
  }, [data]);

  useEffect(() => {
    if (error) toast(error, { type: "error" });
  }, [error]);

  return {
    modalRef,
    photograph,
    ownerID,
    isLoading,
    isUpdate,
    handleUpdatePhoto,
  };
};
