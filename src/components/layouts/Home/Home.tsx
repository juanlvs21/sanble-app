import { useMemo } from "react";
import { BiStoreAlt } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineStorefront } from "react-icons/md";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import { BottomBar } from "@/components/common/BottomBar";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./Home.module.css";

export const HomeLayout = () => {
  const { pathname } = useLocation();

  const matchHome = useMatch(ERoutesName.APP);
  const matchFairsList = useMatch(ERoutesName.FAIRS_LIST);
  const matchStandsList = useMatch(ERoutesName.STANDS_LIST);
  const matchProductsList = useMatch(ERoutesName.PRODUCTS_LIST);

  const items = useMemo(
    () => [
      {
        path: ERoutesName.APP,
        icon: <FiHome size={26} />,
        active: matchHome,
      },
      {
        path: ERoutesName.FAIRS_LIST,
        icon: <BiStoreAlt size={26} />,
        active: matchFairsList,
      },
      {
        path: ERoutesName.STANDS_LIST,
        icon: <MdOutlineStorefront size={26} />,
        active: matchStandsList,
      },
      {
        path: ERoutesName.PRODUCTS_LIST,
        icon: <HiOutlineShoppingBag size={26} />,
        active: matchProductsList,
      },
    ],
    [pathname]
  );

  return (
    <div className={`${styles.homeContainer}`}>
      <section className={`${styles.homeContent}`}>
        <Outlet />
      </section>
      <BottomBar items={items} />
    </div>
  );
};
