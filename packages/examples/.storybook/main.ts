import { defineMain } from "@storybook/react-vite/node";

const config = defineMain({
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@ljcl/storybook-addon-cssprops"],
  framework: "@storybook/react-vite",
  docs: {
    defaultName: "Auto Docs",
  },
});

export default config;
