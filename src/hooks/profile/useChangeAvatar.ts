import { useState } from "react";
import { useIonLoading } from "@ionic/react";

import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { uploadUserPhotoRequest } from "@/services";

export type TChangeAvatarHook = {
  isOpen: boolean;
  onOpen: (open?: boolean) => void;
  handleSubmit: (file?: File) => Promise<void>;
};

export const useChangeAvatar = (): TChangeAvatarHook => {
  const { toast } = useToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (open?: boolean) => {
    if (open) setIsOpen(open);
    else setIsOpen((state) => !state);
  };

  const handleSubmit = async (file?: File) => {
    try {
      if (!file) {
        toast("La fotografía es requerida", {
          type: "success",
        });

        return;
      }

      presentLoading();

      const formData = new FormData();

      formData.append("image", file);

      const user = await uploadUserPhotoRequest(formData);

      setUser(user);

      toast("Fotografía de perfil cambiada con éxito", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsOpen(false);
      dismissLoading();
    }
  };

  return {
    isOpen,
    onOpen,
    handleSubmit,
  };
};
