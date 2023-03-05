import { useParams } from "react-router-dom";

import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhotoNew } from "@/hooks/fairs/photo/useFairPhotoNew";

type TRouteParams = { fairID: string };

export const FairPhotoNew = () => {
  const { fairID } = useParams<TRouteParams>();
  const { handleUploadPhoto } = useFairPhotoNew(fairID || "");

  return (
    <PhotoForm
      handleSave={handleUploadPhoto}
      className="animate__animated animate__screenInUp "
    />
  );
};
