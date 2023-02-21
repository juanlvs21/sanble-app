import { IonPage } from "@ionic/react";
import { RouteComponentProps, useParams } from "react-router-dom";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { TopBar } from "@/components/common/TopBar";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";

type TRouteParams = { fairID: string };
type TPageProps = RouteComponentProps<{}>;

export const FairPhotoNew: React.FC<TPageProps> = () => {
  const { fairID } = useParams<TRouteParams>();
  const { handleUploadPhoto, isSubmit } = useFairPhoto(fairID || "");

  return (
    <IonPage>
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
    </IonPage>
  );
};
