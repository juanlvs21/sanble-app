import { ERoutesName } from "@/types/TRoutes";

import { ComponentProps } from "@/components/common/TopBar";
type TScreens = Omit<ComponentProps, "start" | "end">;

type TOptions = {
  goBackUrl?: string;
};

export const getPropsTopBarMain = (
  route: ERoutesName,
  options?: TOptions
): TScreens => {
  const props: Record<string, TScreens> = {
    [ERoutesName.APP]: {
      title: "Sanble",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.NEAR_YOU]: {
      title: "Cerca de ti",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.FAIRS_LIST]: {
      title: "Ferias",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.FAIR_DETAILS]: {
      title: "Detalles",
      startGoBackUrl: options?.goBackUrl || ERoutesName.FAIRS_LIST,
      titleSize: 24,
      startGoBack: true,
      titleLight: true,
      sticky: true,
    },
    [ERoutesName.FAIR_DETAILS_MAP]: {
      title: "Ubicación",
      sticky: true,
    },
    [ERoutesName.FAIR_DETAILS_PHOTO]: {
      title: "Fotografía",
      titleSize: 24,
      sticky: true,
      stickyNoScroll: true,
    },
    [ERoutesName.FAIR_DETAILS_PHOTO_SLIDES]: {
      title: "Fotografías",
      titleSize: 24,
      sticky: true,
      stickyNoScroll: true,
    },
    [ERoutesName.FAIR_DETAILS_PHOTO_NEW]: {
      title: "Fotografía",
      titleSize: 24,
      startGoBack: true,
      sticky: true,
      stickyNoScroll: true,
    },
    [ERoutesName.STANDS_LIST]: {
      title: "Stands",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.STAND_DETAILS]: {
      title: "Detalles",
      startGoBackUrl: options?.goBackUrl || ERoutesName.STANDS_LIST,
      titleSize: 24,
      startGoBack: true,
      titleLight: true,
      sticky: true,
    },
  };

  return props[route];
};
