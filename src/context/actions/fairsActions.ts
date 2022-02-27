import { Dispatch } from "react";

// Types
import { TAction } from "@/types/TContext";
import { TFair } from "@/types/TFairs";

// Constants
import { fairsConstants } from "@/context/constants";

export const fairsActions = (dispatch: Dispatch<TAction>) => ({
  setFairsList: (data: TFair[]) =>
    dispatch({
      type: fairsConstants.SET_FAIRSLIST,
      payload: data,
    }),
  setFairsUpcoming: (data: TFair[]) =>
    dispatch({
      type: fairsConstants.SET_FAIRSUPCOMING,
      payload: data,
    }),
});
