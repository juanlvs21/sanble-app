import { StandForm } from "@/components/modules/stands/StandForm";
import { useNewStand } from "@/hooks/mySanble/stands/useNewStand";

export const NewStand = () => {
  const { handleSave, formValues } = useNewStand();

  return <StandForm formValues={formValues} handleSave={handleSave} />;
};
