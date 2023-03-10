import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useMatch } from "react-router-dom";

import { ComponentProps } from "@/components/common/TopBar";
import {
  portalTopBarMainEndID,
  portalTopBarMainStartID,
} from "@/helpers/mainPortal";
import { ERoutesName } from "@/types/TRoutes";
import { getPropsTopBarMain } from "@/helpers/mainTopBar";

type TScreens = Omit<ComponentProps, "start" | "end">;

export const useTopBarMain = () => {
  const { pathname, state } = useLocation();
  const [props, setProps] = useState<TScreens>();
  const [renderStart, setRenderStart] = useState(false);
  const [renderEnd, setRenderEnd] = useState(false);

  const isApp = useMatch(ERoutesName.APP);
  const isNearYou = useMatch(ERoutesName.NEAR_YOU);
  const isFairs = useMatch(ERoutesName.FAIRS_LIST);
  const isFairDetails = useMatch(ERoutesName.FAIR_DETAILS);
  const isFairDetailsPhoto = useMatch(ERoutesName.FAIR_DETAILS_PHOTO);
  const isFairDetailsPhotoSlides = useMatch(
    ERoutesName.FAIR_DETAILS_PHOTO_SLIDES
  );
  const isFairDetailsPhotoNew = useMatch(ERoutesName.FAIR_DETAILS_PHOTO_NEW);
  const isStands = useMatch(ERoutesName.STANDS_LIST);
  const isStandDetails = useMatch(ERoutesName.STAND_DETAILS);

  const handleGetData = () => {
    if (isApp) {
      setProps(getPropsTopBarMain(ERoutesName.APP));
      setRenderEnd(true);
    } else if (isNearYou) {
      setProps(getPropsTopBarMain(ERoutesName.NEAR_YOU));
    } else if (isFairs) {
      setProps(getPropsTopBarMain(ERoutesName.FAIRS_LIST));
      setRenderEnd(true);
    } else if (isFairDetails) {
      setProps(
        getPropsTopBarMain(ERoutesName.FAIR_DETAILS, {
          goBackUrl: state?.goBackUrl,
        })
      );
    } else if (isFairDetailsPhoto) {
      setProps(getPropsTopBarMain(ERoutesName.FAIR_DETAILS_PHOTO));
      setRenderStart(true);
      setRenderEnd(true);
    } else if (isFairDetailsPhotoSlides) {
      setProps(getPropsTopBarMain(ERoutesName.FAIR_DETAILS_PHOTO_SLIDES));
      setRenderStart(true);
      setRenderEnd(true);
    } else if (isFairDetailsPhotoNew) {
      setProps(getPropsTopBarMain(ERoutesName.FAIR_DETAILS_PHOTO_NEW));
      setRenderStart(false);
    } else if (isStands) {
      setProps(getPropsTopBarMain(ERoutesName.STANDS_LIST));
      setRenderEnd(true);
    } else if (isStandDetails) {
      setProps(
        getPropsTopBarMain(ERoutesName.STAND_DETAILS, {
          goBackUrl: state?.goBackUrl,
        })
      );
      setRenderEnd(true);
    } else {
      setProps(undefined);
      setRenderStart(false);
      setRenderEnd(false);
    }
  };

  const renderTopBarActionStart = (el: React.ReactElement) => {
    const portalEl = document.querySelector(`#${portalTopBarMainStartID}`);

    return portalEl ? createPortal(el, portalEl) : undefined;
  };

  const renderTopBarActionEnd = (el: React.ReactElement) => {
    const portalEl = document.querySelector(`#${portalTopBarMainEndID}`);
    return portalEl ? createPortal(el, portalEl) : undefined;
  };

  useEffect(() => {
    setProps(undefined);
    handleGetData();
  }, [pathname]);

  return {
    props,
    renderEnd,
    renderStart,
    renderTopBarActionStart,
    renderTopBarActionEnd,
  };
};
