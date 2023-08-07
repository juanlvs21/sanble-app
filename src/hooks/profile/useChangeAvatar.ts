import { useState } from "react";

export type TChangeAvatarHook = {
  isOpen: boolean;
  isLoading: boolean;
  onOpen: (open?: boolean) => void;
  handleSubmit: (file?: File) => Promise<void>;
};

export const useChangeAvatar = (): TChangeAvatarHook => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onOpen = (open?: boolean) => {
    if (open) setIsOpen(open);
    else setIsOpen((state) => !state);
  };

  const handleSubmit = async (file?: File) => {
    console.log({ file });
  };

  return {
    isOpen,
    isLoading,
    onOpen,
    handleSubmit,
  };
};
