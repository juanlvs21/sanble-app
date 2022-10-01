import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const classNameStart = "navFadeUpStart";
const classNameEnd = "navFadeUpEnd";

export const useTransitionsScreen = () => {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState(classNameStart);

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage(classNameEnd);
    console.log({ location, displayLocation });
  }, [location, displayLocation]);

  const onAnimationEnd = () => {
    if (transitionStage !== classNameStart) {
      setTransitionStage(classNameStart);
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
