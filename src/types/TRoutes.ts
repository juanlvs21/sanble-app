export enum ERoutesName {
  ROOT = "/",
  APP = "/app",
  PRODUCTS_LIST = "/app/productos",
  FAVORITES = "/app/favoritos",
  FAVORITES_FAIRS = "/app/favoritos/ferias",
  FAVORITES_STANDS = "/app/favoritos/stands",
  MY_SANBLE = "/app/misanble",
  MY_SANBLE_FAIRS = "/app/misanble/ferias",
  MY_SANBLE_FAIRS_NEW = "/app/misanble/ferias/nueva",
  MY_SANBLE_STANDS = "/app/misanble/stands",
  MY_SANBLE_STANDS_NEW = "/app/misanble/stands/nuevo",
  NEAR_YOU = "/app/cerca",
  PROFILE = "/app/perfil",
  FAIRS_LIST = "/app/ferias",
  FAIR_DETAILS = "/app/ferias/:fairID",
  FAIR_DETAILS_UPDATE = "/app/ferias/:fairID/actualizar",
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
  SESSION_RECOVERY_PASSWORD = "/app/sesion/recovery-password",
  SESSION_RECOVERY_PASSWORD_SUCCESS = "/app/sesion/recovery-password/success",
}
