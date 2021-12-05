import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.vercel.sanble",
  appName: "Sanble",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      // androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
      backgroundColor: "#ffffff",
    },
  },
  server: {
    url: "http://192.168.0.100:3000",
    cleartext: true,
  },
};

export default config;
