const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { default: woocommerce } = require("./cypress/support/wholesalePrice");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  projectId: "woocommerce",
  e2e: {
    stepDefinitions: "cypress/e2e/features/**/*.js",
    specPattern: "cypress/e2e/**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    // Your application's base URL
    baseUrl: "http://localhost:8000/?page_id=9",
    testIsolation: false,
    watchForFileChanges: false,
  },
});
