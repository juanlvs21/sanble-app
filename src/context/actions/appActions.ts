import { Dispatch } from "react";

import { appConstants } from "@/context/constants";
import { TAction } from "@/types/TContext";
import { setStorage } from "@/helpers/storage";
import { StorageHideMobileWelcomeKey } from "@/helpers/storageKeys";

export const appActions = (dispatch: Dispatch<TAction>) => ({
  setReadyToUse: (readyToUse: boolean) =>
    dispatch({
      type: appConstants.SET_READY_TO_USE,
      payload: { readyToUse },
    }),
  setShowSidebar: (showSidebar: boolean) =>
    dispatch({
      type: appConstants.SET_SHOW_SIDEBAR,
      payload: { showSidebar },
    }),
  setOpenNotifications: (openNotifications: boolean) =>
    dispatch({
      type: appConstants.SET_OPEN_NOTIFICATIONS,
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
  setHideMobileWelcome: async (hideMobileWelcome: boolean = false) => {
    await setStorage(StorageHideMobileWelcomeKey, Boolean(hideMobileWelcome));

    return dispatch({
      type: appConstants.SET_HIDE_MOBILE_WELCOME,
      payload: { hideMobileWelcome },
    });
  },
  setDeviceID: (deviceID: string) =>
    dispatch({
      type: appConstants.SET_DEVICE_ID,
      payload: { deviceID },
    }),
});
