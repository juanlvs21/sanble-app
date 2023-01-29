import { TPhotographForm } from "@/types/TPhotograph";

export const useFairPhoto = () => {
  const handleSavePhoto = (data: TPhotographForm) => {
    console.log(data);
  };

  return {
    handleSavePhoto,
  };
};
