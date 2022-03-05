import { Dispatch } from "react";

// Types
import { TAction } from "@/types/TContext";
import { TStand } from "@/types/TStands";

// Constants
import { standsConstants } from "@/context/constants";

export const fairsActions = (dispatch: Dispatch<TAction>) => ({
  setStandsList: (data: TStand[]) =>
    dispatch({
      type: standsConstants.SET_STANDSLIST,
      payload: data,
    }),
  setStandsBest: (data: TStand[]) =>
    dispatch({
      type: standsConstants.SET_STANDSBESTS,
      payload: data,
    }),
});
