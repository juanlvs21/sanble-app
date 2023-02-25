import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/useToast";
import {
  deleteFairPhotoRequest,
  getFairPhotoRequest,
  updateFairPhotoRequest,
  uploadFairPhotoRequest,
} from "@/services";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";
import { ERoutesName } from "@/types/TRoutes";

export const useFairPhoto = (fairID: string) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [photograph, setPhotograph] = useState<TPhotograph>();
  const [ownerID, setOwnerID] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChangingPhoto, setIsChangingPhoto] = useState(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);

  const handleGetPhoto = async (photoID: string) => {
    setIsLoading(true);

    try {
      const { photograph, ownerID } = await getFairPhotoRequest(
        fairID,
        photoID
      );
      setPhotograph(photograph);
      setOwnerID(ownerID);
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

  const handleUpdatePhoto = async (data: TPhotographForm) => {
    setIsSubmit(true);

    try {
      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      if (data.image) formData.append("image", data.image);

      const { photograph: photographRes, ownerID } =
        await updateFairPhotoRequest(fairID, data.id, formData);

      toast("Fotografía actualizada con éxito", {
        type: "success",
      });

      setPhotograph(photographRes);
      setOwnerID(ownerID);

      if (photograph?.url !== photographRes.url) {
        setIsChangingPhoto(true);
      }
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  const handleDeletePhoto = async (
    photoID: string,
    callbackSucces: () => void
  ) => {
    setIsLoading(true);

    try {
      await deleteFairPhotoRequest(fairID, photoID);
      toast("Fotografía eliminada con éxito", {
        type: "success",
      });
      setIsDeletingPhoto(true);
      callbackSucces();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSubmit && modalRef?.current) {
      modalRef?.current?.dismiss();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isChangingPhoto) setIsDeletingPhoto(false);
  }, [isChangingPhoto]);

  useEffect(() => {
    if (isDeletingPhoto) setIsDeletingPhoto(false);
  }, [isDeletingPhoto]);

  return {
    modalRef,
    isLoading,
    isSubmit,
    isChangingPhoto,
    isDeletingPhoto,
    photograph,
    ownerID,
    handleUploadPhoto,
    handleGetPhoto,
    handleUpdatePhoto,
    handleDeletePhoto,
  };
};
