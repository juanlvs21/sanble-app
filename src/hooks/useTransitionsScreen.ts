import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const authClassNameStart = "navFadeUpStart";
const authClassNameEnd = "navFadeUpEnd";

export const useTransitionsScreen = () => {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStageAuth, setTransitionStageAuth] =
    useState(authClassNameStart);

  useEffect(() => {
    if (location !== displayLocation) setTransitionStageAuth(authClassNameEnd);
  }, [location, displayLocation]);

  const onAnimationEndAuth = () => {
    if (transitionStageAuth === authClassNameEnd) {
      setTransitionStageAuth(authClassNameStart);
      setDisplayLocation(location);
    }
  };

  return {
    displayLocation,
    auth: {
      onAnimationEndAuth,
      transitionStageAuth,
    },
  };
};
