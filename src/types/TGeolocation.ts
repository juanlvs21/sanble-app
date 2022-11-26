export type TCoords = {
  /**
   * Latitude in decimal degrees
   */
  latitude: number;
  /**
   * longitude in decimal degrees
   */
  longitude: number;
  /**
   * Accuracy level of the latitude and longitude coordinates in meters
   */
  accuracy: number;
  /**
   * Accuracy level of the altitude coordinate in meters, if available.
   * Available on all iOS versions and on Android 8.0+.
   */
  altitudeAccuracy: number | null | undefined;
  /**
   * The altitude the user is at (if available)
   */
  altitude: number | null;
  /**
   * The speed the user is traveling (if available)
   */
  speed: number | null;
  /**
   * The heading the user is facing (if available)
   */
  heading: number | null;
};
