/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../stories"],
  addons: ["@ljcl/storybook-addon-cssprops", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {},
    },
  },
  docs: {
    autodocs: true, // see below for alternatives
    defaultName: "Docs", // set to change the name of generated docs entries
  },
};

export default config;
