import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type ComponentProps = {
  children: React.ReactElement | React.ReactElement[];
};

export const TransitionUpDown: React.FC<ComponentProps> = ({ children }) => {
  const { pathname } = useLocation();
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("navFadeUp");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("navFadeDown");
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "navFadeDown") {
          setTransistionStage("navFadeUp");
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  );
};
