/// <reference types="@codetrix-studio/capacitor-google-auth" />

import { CapacitorConfig } from "@capacitor/cli";

import { googleAuth } from "./capacitor.env.json";

const config: CapacitorConfig = {
  appId: "dev.juanl.sanble",
  appName: "Sanble",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      clientId: googleAuth.clientId,
      forceCodeForRefreshToken: true,
    },
  },
  // server: {
  //   url: "http://192.168.0.107:3000",
  //   cleartext: true,
  // },
};

export default config;
