import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  navFadeUpEnd,
  navFadeUpStart,
} from "@/helpers/constTransitionsClasses";

export const useTransitionsScreen = () => {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState(navFadeUpStart);

  useEffect(() => {
    const currentRoute = `${displayLocation.pathname}${displayLocation.search}`;
    const newRoute = `${location.pathname}${location.search}`;

    if (currentRoute !== newRoute) {
      setTransitionStage(navFadeUpEnd);
    }
  }, [location, displayLocation]);

  const onAnimationEnd = () => {
    if (transitionStage !== navFadeUpStart) {
      setTransitionStage(navFadeUpStart);
      setDisplayLocation(location);
    }
  };

  const setDefaultLocation = () => setDisplayLocation(location);

  return {
    displayLocation,
    transitionStage,
    onAnimationEnd,
    setDefaultLocation,
  };
};
