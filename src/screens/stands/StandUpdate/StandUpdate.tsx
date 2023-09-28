import { useParams } from "react-router-dom";

import { StandForm } from "@/components/modules/stands/StandForm";
import { useStandUpdate } from "@/hooks/stands/useStandUpdate";

type TRouteParams = { standID: string };

export const StandUpdate = () => {
  const { standID } = useParams<TRouteParams>();

  const { isLoadingDetails, handleSave, formValues } = useStandUpdate(
    standID ?? ""
  );

  return (
    <StandForm
      formValues={formValues}
      handleSave={handleSave}
      isLoading={isLoadingDetails}
    />
  );
};
