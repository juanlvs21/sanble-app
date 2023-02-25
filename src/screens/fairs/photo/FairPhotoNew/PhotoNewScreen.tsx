import { useParams } from "react-router-dom";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { TopBar } from "@/components/common/TopBar";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";

type TRouteParams = { fairID: string };

export const FairPhotoNew = () => {
  const { fairID } = useParams<TRouteParams>();
  const { handleUploadPhoto, isSubmit } = useFairPhoto(fairID || "");

  return (
    <>
      <TopBar
        title="Fotografía"
        startGoBack
        titleSize={24}
        sticky
        stickyNoScroll
      />

      <PhotoForm
        handleSave={handleUploadPhoto}
        isLoading={isSubmit}
        className="animate__animated animate__screenInUp "
      />
      <SpinnerFullScreen show={Boolean(isSubmit)} />
    </>
  );
};
