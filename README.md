# Storybook Component Tokens Addon

```sh
npm i -D @kickstartds/storybook-addon-component-tokens
```

Enable the addon in [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
module.exports = {
  addons: ["@kickstartds/storybook-addon-component-tokens"],
};
```

To use it inside MDX, or when customising the docs page:

```js
import { CssPropsBlock } from "@kickstartds/storybook-addon-component-tokens";
```

## Usage

Include your component tokens, the addon will apply and document this automatically.

```jsx
export default {
  title: "Simple Component",
  parameters: {
    cssprops: {
      "--color-primary": [
        {
          value: "#ff017d",
          selector: ":root"
        }
      ]
    }
  },
} as Meta;
```

### Adding to DocsPage and MDX

#### DocsPage

Modify the docs page based by [following the storybook docs](https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks). Including `<CssPropsBlock />` where you prefer.

## Development

This monorepo uses yarn workspaces, run `yarn` at the root.

### TODO

[] Look for the args of a defined component when in MDX  
[] Configurable per story sessionstorage.  
[] Better specificity when injecting styles (with & without iframes)
[] Functioning reset button.

## Credits

Based on [storybook-addon-cssprops](https://github.com/ljcl/storybook-addon-cssprops) from Luke Clark ([@ljcl](https://github.com/ljcl)).

Portions of this package are sourced from the storybook source code in order to maintain look and feel.
