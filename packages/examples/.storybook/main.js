module.exports = {
  stories: ["../stories"],
  addons: ["@ljcl/storybook-addon-cssprops", "@storybook/addon-docs"],
  framework: "@storybook/react",
  features: {
    storyStoreV7: true,
    previewMdx2: true,
  },
  core: {
    builder: "webpack5",
  },
};
