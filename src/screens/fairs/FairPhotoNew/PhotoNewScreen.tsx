import { TopBar } from "@/components/common/TopBar";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";

export const FairPhotoNew = () => {
  const { handleSavePhoto } = useFairPhoto();

  return (
    <>
      <TopBar
        title="Fotografía"
        startGoBack
        titleSize={24}
        sticky
        stickyNoScroll
      />

      <PhotoForm handleSave={handleSavePhoto} />
    </>
  );
};
