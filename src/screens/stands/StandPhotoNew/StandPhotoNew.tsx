import { useParams } from "react-router-dom";

import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useStandPhotoNew } from "@/hooks/stands/photo/useStandPhotoNew";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";

type TRouteParams = { standID: string };

export const StandPhotoNew = () => {
  useDocumentTitleApp("Nueva Fotografía de Stand 📷");
  const { standID } = useParams<TRouteParams>();
  const { handleUploadPhoto } = useStandPhotoNew(standID || "");

  return (
    <PhotoForm
      handleSave={handleUploadPhoto}
      className="animate__animated animate__screenInUp "
    />
  );
};
