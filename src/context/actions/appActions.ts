import { Dispatch } from "react";

import { appConstants } from "@/context/constants";
import { TAction } from "@/types/TContext";

export const appActions = (dispatch: Dispatch<TAction>) => ({
  setReadyToUse: (readyToUse: boolean) =>
    dispatch({
      type: appConstants.SET_READY_TO_USE,
      payload: { readyToUse },
    }),
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
  setScrollTop: (scrollTop: number) =>
    dispatch({
      type: appConstants.SET_SCROLL_TOP,
      payload: { scrollTop },
    }),
  setIsLoadingFull: (isLoadingFull: boolean) =>
    dispatch({
      type: appConstants.SET_IS_LOADING_FULL,
      payload: { isLoadingFull },
    }),
});
