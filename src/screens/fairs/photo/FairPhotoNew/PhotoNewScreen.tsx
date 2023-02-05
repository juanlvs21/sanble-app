import { useParams } from "react-router-dom";

import { TopBar } from "@/components/common/TopBar";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";

export const FairPhotoNew = () => {
  const { fairID } = useParams();
  const { handleUploadPhoto } = useFairPhoto(fairID || "");

  return (
    <>
      <TopBar
        title="Fotografía"
        startGoBack
        titleSize={24}
        sticky
        stickyNoScroll
      />

      <PhotoForm handleSave={handleUploadPhoto} />
    </>
  );
};
