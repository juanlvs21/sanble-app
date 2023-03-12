import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useStandPhotoNew } from "@/hooks/stands/photo/useStandPhotoNew";

type TRouteParams = { standID: string };

export const StandPhotoNew = () => {
  const { standID } = useParams<TRouteParams>();
  const { handleUploadPhoto } = useStandPhotoNew(standID || "");

  useDocumentTitle("Nueva Fotografía de Stand 📷");

  return (
    <PhotoForm
      handleSave={handleUploadPhoto}
      className="animate__animated animate__screenInUp "
    />
  );
};
