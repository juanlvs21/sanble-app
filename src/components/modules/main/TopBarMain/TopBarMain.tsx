import { TopBar } from "@/components/common/TopBar";
import {
  portalTopBarMainEndID,
  portalTopBarMainStartID,
} from "@/helpers/mainPortal";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { useEffect } from "react";

export const TopBarMain = () => {
  const { props, renderStart, renderEnd } = useTopBarMain();

  return (
    <TopBar
      start={renderStart ? <div id={portalTopBarMainStartID} /> : undefined}
      end={renderEnd ? <div id={portalTopBarMainEndID} /> : undefined}
      {...props}
    />
  );
};
