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
  const isFairDetailsUpdate = useMatch(ERoutesName.FAIR_DETAILS_UPDATE);
  const isFairDetailsMap = useMatch(ERoutesName.FAIR_DETAILS_MAP);
  const isFairDetailsPhotoSlides = useMatch(
    ERoutesName.FAIR_DETAILS_PHOTO_SLIDES
  );
  const isFairDetailsPhotoNew = useMatch(ERoutesName.FAIR_DETAILS_PHOTO_NEW);
  const isStands = useMatch(ERoutesName.STANDS_LIST);
  const isStandDetails = useMatch(ERoutesName.STAND_DETAILS);
  const isStandDetailsUpdate = useMatch(ERoutesName.STAND_DETAILS_UPDATE);
  const isStandDetailsPhotoSlides = useMatch(
    ERoutesName.STAND_DETAILS_PHOTO_SLIDES
  );
  const isProducts = useMatch(ERoutesName.PRODUCTS_LIST);
  const isStandDetailsPhotoNew = useMatch(ERoutesName.STAND_DETAILS_PHOTO_NEW);
  const isStandDetailsProducts = useMatch(ERoutesName.STAND_DETAILS_PRODUCTS);
  const isMySanbleFairs = useMatch(ERoutesName.MY_SANBLE_FAIRS);
  const isMySanbleFairsNew = useMatch(ERoutesName.MY_SANBLE_FAIRS_NEW);
  const isMySanbleStands = useMatch(ERoutesName.MY_SANBLE_STANDS);
  const isMySanbleStandsNew = useMatch(ERoutesName.MY_SANBLE_STANDS_NEW);
  const isFavoriteFairs = useMatch(ERoutesName.FAVORITES_FAIRS);
  const isFavoriteStands = useMatch(ERoutesName.FAVORITES_STANDS);
  const isInvitationsSent = useMatch(ERoutesName.INVITATIONS_SENT);
  const isInvitationsReceived = useMatch(ERoutesName.INVITATIONS_RECEIVED);
  const isProfile = useMatch(ERoutesName.PROFILE);

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
    } else if (isFairDetailsUpdate) {
      setProps(getPropsTopBarMain(ERoutesName.FAIR_DETAILS_UPDATE));
      setRenderEnd(true);
    } else if (isFairDetailsMap) {
      setProps(getPropsTopBarMain(ERoutesName.FAIR_DETAILS_MAP));
    } else if (isFairDetailsPhotoNew) {
      setProps(getPropsTopBarMain(ERoutesName.FAIR_DETAILS_PHOTO_NEW));
      setRenderStart(false);
    } else if (isFairDetailsPhotoSlides) {
      setProps(getPropsTopBarMain(ERoutesName.FAIR_DETAILS_PHOTO_SLIDES));
      setRenderStart(true);
      setRenderEnd(true);
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
    } else if (isStandDetailsUpdate) {
      setProps(getPropsTopBarMain(ERoutesName.STAND_DETAILS_UPDATE));
      setRenderEnd(true);
    } else if (isStandDetailsPhotoNew) {
      setProps(getPropsTopBarMain(ERoutesName.STAND_DETAILS_PHOTO_NEW));
      setRenderStart(false);
    } else if (isStandDetailsProducts) {
      setProps(getPropsTopBarMain(ERoutesName.STAND_DETAILS_PRODUCTS));
      setRenderStart(false);
    } else if (isStandDetailsPhotoSlides) {
      setProps(getPropsTopBarMain(ERoutesName.STAND_DETAILS_PHOTO_SLIDES));
      setRenderStart(true);
      setRenderEnd(true);
    } else if (isProducts) {
      setProps(getPropsTopBarMain(ERoutesName.PRODUCTS_LIST));
      setRenderEnd(true);
    } else if (isMySanbleFairs) {
      setProps(getPropsTopBarMain(ERoutesName.MY_SANBLE_FAIRS));
      setRenderEnd(true);
    } else if (isMySanbleFairsNew) {
      setProps(getPropsTopBarMain(ERoutesName.MY_SANBLE_FAIRS_NEW));
      setRenderEnd(true);
    } else if (isMySanbleStands) {
      setProps(getPropsTopBarMain(ERoutesName.MY_SANBLE_STANDS));
      setRenderEnd(true);
    } else if (isMySanbleStandsNew) {
      setProps(getPropsTopBarMain(ERoutesName.MY_SANBLE_STANDS_NEW));
      setRenderEnd(true);
    } else if (isInvitationsSent) {
      setProps(getPropsTopBarMain(ERoutesName.INVITATIONS_SENT));
      setRenderEnd(true);
    } else if (isInvitationsReceived) {
      setProps(getPropsTopBarMain(ERoutesName.INVITATIONS_RECEIVED));
      setRenderEnd(true);
    } else if (isFavoriteFairs) {
      setProps(getPropsTopBarMain(ERoutesName.FAVORITES_FAIRS));
      setRenderEnd(true);
    } else if (isFavoriteStands) {
      setProps(getPropsTopBarMain(ERoutesName.FAVORITES_STANDS));
      setRenderEnd(true);
    } else if (isProfile) {
      setProps(getPropsTopBarMain(ERoutesName.PROFILE));
    } else {
      setProps(undefined);
      setRenderStart(false);
      setRenderEnd(false);
    }
  };

  const renderTopBarActionStart = (el: React.ReactNode) => {
    const portalEl = document.querySelector(`#${portalTopBarMainStartID}`);

    return portalEl ? createPortal(el as any, portalEl) : null;
  };

  const renderTopBarActionEnd = (el: React.ReactNode) => {
    const portalEl = document.querySelector(`#${portalTopBarMainEndID}`);
    return portalEl ? createPortal(el as any, portalEl) : null;
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
