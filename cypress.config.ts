import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            "@app": path.resolve(__dirname, "./app"),
            "@components": path.resolve(__dirname, "./components"),
          },
        },
      },
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
