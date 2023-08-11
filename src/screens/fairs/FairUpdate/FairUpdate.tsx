import { useParams } from "react-router-dom";

import { FairForm } from "@/components/modules/fairs/FairForm";
import { useFairUpdate } from "@/hooks/fairs/useFairUpdate";

type TRouteParams = { fairID: string };

export const FairUpdate = () => {
  const { fairID } = useParams<TRouteParams>();

  const {
    isLoadingDetails,
    handleFormNext,
    onOpenMapModal,
    handleSetLocation,
    handleSave,
    openMapModal,
    formValues,
  } = useFairUpdate(fairID ?? "");

  return (
    <FairForm
      formValues={formValues}
      openMapModal={openMapModal}
      onOpenMapModal={onOpenMapModal}
      handleFormNext={handleFormNext}
      handleSetLocation={handleSetLocation}
      handleSave={handleSave}
      isLoading={isLoadingDetails}
    />
  );
};
