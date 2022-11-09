# Component Tokens Addon

Displays CSS Custom Properties used inside a component. Extracts those values using [`custom-property-extract`](https://github.com/Dschungelabenteuer/custom-property-extract), and then converts those to a format displayed alongside your component inside **Storybook**.

This helps in making token associations explicit (which **Component Token** uses what **Design Token** under the hood), while also illustrating the layering of tokens inside a single component (for example to generate style variations).

You can also interact with those variables, for example changing some colors around. Those changes get persisted in your browser session, so you can easily verify if your changes work in the context of other components, too (the new color on that button might not be accessible when used in you `Hero` component, after all). There's currently no way of persisting changes made in the browser in this way, but we're thinking about this. Let us know if that's something that you'd be interested in!

**[Show me a working demo](https://www.kickstartds.com/storybook/?path=/story/base-content-box--image)** (click on the `Component Tokens` addon tab)

![Teaser image](./docs/teaser.png)

**Table of contents:**

- [Component Tokens Addon](#component-tokens-addon)
  - [What it's for](#what-its-for)
  - [Getting started](#getting-started)
    - [Usage](#usage)
      - [Adding to DocsPage and MDX](#adding-to-docspage-and-mdx)
      - [DocsPage](#docspage)
  - [Advanced configuration](#advanced-configuration)
  - [Development](#development)
  - [TODOs and ideas for the future](#todos-and-ideas-for-the-future)
  - [Credits](#credits)

## What it's for

Main things you can do with this addon:

1. Look through defined and layered **Component Token**
2. Modify token assignments live in **Storybook**
3. Test those changed tokens in all available contexts

## Getting started

```sh
yarn add --dev @kickstartds/storybook-addon-component-tokens
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

### Usage

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

#### Adding to DocsPage and MDX

This is currently not documented. But feel free to ping us on Twitter or Discord to learn more about this.

#### DocsPage

Modify the docs page based by [following the storybook docs](https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks). Including `<CssPropsBlock />` where you prefer.

## Advanced configuration

This addon is still early, advanced configuration options will be added at a later date. Feel free to let us know in the issues if something specific is unclear, or doesn't work!

## Development

This monorepo uses yarn workspaces, run `yarn` at the root.

## TODOs and ideas for the future

[] Look for the args of a defined component when in MDX  
[] Configurable per story sessionstorage.  
[] Better specificity when injecting styles (with & without iframes)
[] Functioning reset button.

## Credits

Based on [storybook-addon-cssprops](https://github.com/ljcl/storybook-addon-cssprops) from Luke Clark ([@ljcl](https://github.com/ljcl)).

Portions of this package are sourced from the storybook source code in order to maintain look and feel.
