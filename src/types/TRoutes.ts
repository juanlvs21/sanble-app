export enum ERoutesName {
  ROOT = "/",
  APP = "/app",
  PRODUCTS_LIST = "/app/productos",
  FAVORITES_LIST = "/app/favoritos",
  MY_SANBLE = "/app/misanble",
  MY_SANBLE_FAIRS = "/app/misanble/ferias",
  MY_SANBLE_FAIRS_NEW = "/app/misanble/ferias/nueva",
  MY_SANBLE_STANDS = "/app/misanble/stands",
  NEAR_YOU = "/app/cerca",
  PROFILE = "/app/perfil",
  FAIRS_LIST = "/app/ferias",
  FAIR_DETAILS = "/app/ferias/:fairID",
  FAIR_DETAILS_MAP = "/app/ferias/:fairID/mapa",
  FAIR_DETAILS_PHOTO_SLIDES = "/app/ferias/:fairID/fotos",
  FAIR_DETAILS_PHOTO_NEW = "/app/ferias/:fairID/fotos/nueva",
  STANDS_LIST = "/app/stands",
  STAND_DETAILS = "/app/stands/:standID",
  STAND_DETAILS_PHOTO_SLIDES = "/app/stands/:standID/fotos",
  STAND_DETAILS_PHOTO_NEW = "/app/stands/:standID/fotos/nueva",
  SESSION = "/app/sesion",
  SESSION_SIGNIN = "/app/sesion/entrar",
  SESSION_SIGNUP = "/app/sesion/registrarse",
}
