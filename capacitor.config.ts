import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.juanl.sanble",
  appName: "Sanble",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
  },
  server: {
    url: "http://192.168.0.117:3000",
    cleartext: true,
  },
};

export default config;
