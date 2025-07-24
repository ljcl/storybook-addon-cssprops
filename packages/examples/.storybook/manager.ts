import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

import pkg from "@ljcl/storybook-addon-cssprops/package.json";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "CSS Custom Properties Addon",
    brandUrl: pkg.homepage,
  }),
  sidebar: {
    showRoots: false,
  },
});
