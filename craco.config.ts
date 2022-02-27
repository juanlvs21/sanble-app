/* craco.config.ts */
import path from "path";

const config = {
  webpack: {
    alias: {
      "@": path.join(path.resolve(__dirname, "./src")),
    },
  },
};

export default config;
