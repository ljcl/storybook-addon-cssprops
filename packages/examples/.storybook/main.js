import { dirname, join } from "path";
/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../stories"],
  addons: [getAbsolutePath("@ljcl/storybook-addon-cssprops"), getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
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

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
