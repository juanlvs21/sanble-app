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
      title: "Detalles Feria",
      startGoBackUrl: options?.goBackUrl || ERoutesName.FAIRS_LIST,
      startGoBack: true,
      titleLight: true,
      sticky: true,
    },
    [ERoutesName.FAIR_DETAILS_UPDATE]: {
      title: "Actualizar Feria",
      startGoBack: true,
      sticky: true,
    },
    [ERoutesName.FAIR_DETAILS_MAP]: {
      title: "Ubicación Feria",
      sticky: true,
    },
    [ERoutesName.FAIR_DETAILS_PHOTO_SLIDES]: {
      title: "Fotografías Feria",
      sticky: true,
      stickyNoScroll: true,
    },
    [ERoutesName.FAIR_DETAILS_PHOTO_NEW]: {
      title: "Fotografía Feria",
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
      title: "Detalles Stand",
      startGoBackUrl: options?.goBackUrl || ERoutesName.STANDS_LIST,
      startGoBack: true,
      titleLight: true,
      sticky: true,
    },
    [ERoutesName.STAND_DETAILS_UPDATE]: {
      title: "Actualizar Stand",
      startGoBack: true,
      sticky: true,
    },
    [ERoutesName.STAND_DETAILS_PHOTO_SLIDES]: {
      title: "Fotografías Stand",
      sticky: true,
      stickyNoScroll: true,
    },
    [ERoutesName.STAND_DETAILS_PHOTO_NEW]: {
      title: "Fotografía Stand",
      startGoBack: true,
      sticky: true,
      stickyNoScroll: true,
    },
    [ERoutesName.STAND_DETAILS_PRODUCTS]: {
      title: "Productos",
      startGoBack: true,
      sticky: true,
      stickyNoScroll: true,
    },
    [ERoutesName.PRODUCTS_LIST]: {
      title: "Productos",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.MY_SANBLE_FAIRS]: {
      title: "Mis Ferias",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.MY_SANBLE_FAIRS_NEW]: {
      title: "Nueva Feria",
      startGoBack: true,
      sticky: true,
    },
    [ERoutesName.MY_SANBLE_STANDS_NEW]: {
      title: "Nuevo Stand",
      startGoBack: true,
      sticky: true,
    },
    [ERoutesName.MY_SANBLE_STANDS]: {
      title: "Mis Stands",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.FAVORITES_FAIRS]: {
      title: "Ferias Favoritas",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.FAVORITES_STANDS]: {
      title: "Stands Favoritos",
      startUser: true,
      sticky: true,
    },
    [ERoutesName.PROFILE]: {
      title: "Perfil",
      startUser: true,
      sticky: true,
    },
  };

  return props[route];
};
