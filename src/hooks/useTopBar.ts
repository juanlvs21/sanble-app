import { createPortal } from "react-dom";

export const useTopBar = () => {
  const renderTopBar = (element: React.ReactElement) => {
    const portalTag = document.querySelector("#sanble-main-topbar");

    return portalTag ? createPortal(element, portalTag) : undefined;
  };

  return {
    renderTopBar,
  };
};
