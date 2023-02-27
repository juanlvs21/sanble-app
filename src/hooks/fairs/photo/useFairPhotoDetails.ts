import { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/immutable";

import { useToast } from "@/hooks/useToast";
import { getFairPhotoRequest, updateFairPhotoRequest } from "@/services";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";
import { useFairPhotoRevalidate } from "@/hooks/fairs/useFairPhotoRevalidate";

export const useFairPhotoDetails = (fairID: string, photoID: string) => {
  const { toast } = useToast();
  const { handleRevalidateUpdate } = useFairPhotoRevalidate(fairID);

  const modalRef = useRef<HTMLIonModalElement>(null);
  const [photograph, setPhotograph] = useState<TPhotograph>();
  const [ownerID, setOwnerID] = useState<string>();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChangingPhoto, setIsChangingPhoto] = useState(false);

  const { data, error, isLoading, mutate } = useSWRMutation(
    `/fairs/${fairID}/photograph/${photoID}`,
    async () => await getFairPhotoRequest(fairID, photoID)
  );

  const handleUpdatePhoto = async (data: TPhotographForm) => {
    setIsSubmit(true);

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

      toast("Fotografía actualizada con éxito", {
        type: "success",
      });

      await mutate();

      if (photograph?.url !== photographRes.url) setIsChangingPhoto(true);

      if (photographRes.isCover) handleRevalidateUpdate(photographRes);
    } catch (error) {
      console.log(error);
      toast(error, {
        type: "error",
      });
    } finally {
      setIsSubmit(false);
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

  useEffect(() => {
    if (!isSubmit && modalRef?.current) {
      modalRef?.current?.dismiss();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isChangingPhoto) {
      setIsChangingPhoto(false);
    }
  }, [isChangingPhoto]);

  return {
    modalRef,
    photograph,
    ownerID,
    isLoading,
    isSubmit,
    isChangingPhoto,
    handleUpdatePhoto,
  };
};
