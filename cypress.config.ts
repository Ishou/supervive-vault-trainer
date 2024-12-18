import { defineConfig } from "cypress";

// @ts-expect-error force require
// eslint-disable-next-line @typescript-eslint/no-require-imports
const registerCodeCoverageTasks = require("@cypress/code-coverage/task");

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);

      return config;
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);

      return config;
    },
  },
});
