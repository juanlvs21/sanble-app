import { Dispatch } from "react";

import { appConstants } from "@/context/constants";
import { TAction } from "@/types/TContext";

export const appActions = (dispatch: Dispatch<TAction>) => ({
  setShowSidebar: (showSidebar: boolean) =>
    dispatch({
      type: appConstants.SHOW_SIDEBAR,
      payload: { showSidebar },
    }),
  setOpenNotifications: (openNotifications: boolean) =>
    dispatch({
      type: appConstants.OPEN_NOTIFICATIONS,
      payload: { openNotifications },
    }),
});
