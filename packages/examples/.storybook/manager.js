import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

import pkg from "@kickstartds/storybook-addon-component-tokens/package.json";

addons.setConfig({
  theme: create({
    brandTitle: "Component Tokens Addon",
    brandUrl: pkg.homepage,
  }),
});
