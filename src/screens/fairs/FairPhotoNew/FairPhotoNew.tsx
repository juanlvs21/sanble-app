import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhotoNew } from "@/hooks/fairs/photo/useFairPhotoNew";

type TRouteParams = { fairID: string };

export const FairPhotoNew = () => {
  const { fairID } = useParams<TRouteParams>();
  const { handleUploadPhoto } = useFairPhotoNew(fairID || "");

  useDocumentTitle("Nueva Fotografía de Feria 📷");

  return (
    <PhotoForm
      handleSave={handleUploadPhoto}
      className="animate__animated animate__screenInUp "
    />
  );
};
