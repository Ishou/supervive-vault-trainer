import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import * as packageInfos from "./package.json";

export default defineConfig({
  plugins: [react({ jsxImportSource: "@emotion/react" }), istanbul()],
  define: {
    __APP_VERSION__: JSON.stringify(packageInfos.version),
    __APP_REPOSITORY__: JSON.stringify(packageInfos.repository),
    __APP_DESCRIPTION__: JSON.stringify(packageInfos.description),
    __APP_AUTHOR_NAME__: JSON.stringify(packageInfos.author.name),
  },
});
