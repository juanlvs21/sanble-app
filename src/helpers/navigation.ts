export const getNavStateText = (
  routeID: string = "",
  stateID: string = "",
  text: string = ""
) => (routeID === stateID ? text : "");
