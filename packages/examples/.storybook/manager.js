import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

import pkg from "@ljcl/storybook-addon-cssprops/package.json";

addons.setConfig({
  theme: create({
    brandTitle: "CSS Custom Properties Addon",
    brandUrl: pkg.homepage,
  }),
  sidebar: {
    showRoots: false,
  },
});
