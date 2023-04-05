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

// Colocar un boton de siguiente que abra con modal con el mapa, y
// que el modal sea el que haga el submit, redirigir a detalles de
// feria con un state goBack del listado de mis ferias
