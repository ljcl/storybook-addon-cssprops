import { defineMain } from "@storybook/react-vite/node";

const config = defineMain({
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@ljcl/storybook-addon-cssprops", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  docs: {
    defaultName: "Auto Docs",
  },
});

export default config;
