import { FairForm } from "@/components/modules/fairs/FairForm";
import { useNewFair } from "@/hooks/mySanble/fairs/useNewFair";

export const NewFair = () => {
  const {
    handleFormNext,
    onOpenMapModal,
    handleSetLocation,
    handleSave,
    openMapModal,
    formValues,
  } = useNewFair();

  return (
    <FairForm
      formValues={formValues}
      openMapModal={openMapModal}
      onOpenMapModal={onOpenMapModal}
      handleFormNext={handleFormNext}
      handleSetLocation={handleSetLocation}
      handleSave={handleSave}
    />
  );
};
