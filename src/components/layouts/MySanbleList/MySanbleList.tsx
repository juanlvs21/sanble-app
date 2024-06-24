import { useMemo } from "react";
import { BiStoreAlt } from "react-icons/bi";
import { MdOutlineStorefront } from "react-icons/md";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import { BottomBar } from "@/components/common/BottomBar";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./MySanbleList.module.css";

export const MySanbleList = () => {
  const { pathname } = useLocation();

  const matchMySanbleFairs = useMatch(ERoutesName.MY_SANBLE_FAIRS);
  const matchMySanbleStands = useMatch(ERoutesName.MY_SANBLE_STANDS);

  const items = useMemo(
    () => [
      {
        path: ERoutesName.MY_SANBLE_FAIRS,
        icon: <BiStoreAlt size={26} />,
        active: matchMySanbleFairs,
      },
      {
        path: ERoutesName.MY_SANBLE_STANDS,
        icon: <MdOutlineStorefront size={26} />,
        active: matchMySanbleStands,
      },
    ],
    [pathname]
  );

  return (
    <div className={`${styles.mySanbleListContainer}`}>
      <section className={`${styles.mySanbleListContent}`}>
        <Outlet />
      </section>
      <BottomBar items={items} />
    </div>
  );
};
