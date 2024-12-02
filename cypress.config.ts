import { defineConfig } from "cypress";
import path from "path";

import cypressCodeCoverage from "@cypress/code-coverage/task";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            "@/": path.resolve(__dirname, "./src"),
          },
        },
      },
    },
    setupNodeEvents(on, config) {
      cypressCodeCoverage(on, config);

      return config;
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      cypressCodeCoverage(on, config);

      return config;
    },
    env: {
      codeCoverage: {
        // At end of run, call this endpoint to retrieve code coverage info from the backend
        // and combine with coverage info from frontend code executed in the browser
        url: "http://localhost:3000/api/__coverage__",
      },
    },
  },
});
