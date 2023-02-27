import { useParams } from "react-router-dom";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhotoNew } from "@/hooks/fairs/photo/useFairPhotoNew";

type TRouteParams = { fairID: string };

export const FairPhotoNew = () => {
  const { fairID } = useParams<TRouteParams>();
  const { handleUploadPhoto, isLoading } = useFairPhotoNew(fairID || "");

  return (
    <>
      <PhotoForm
        handleSave={handleUploadPhoto}
        isLoading={isLoading}
        className="animate__animated animate__screenInUp "
      />
      <SpinnerFullScreen show={Boolean(isLoading)} />
    </>
  );
};
