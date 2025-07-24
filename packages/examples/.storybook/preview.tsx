import React from "react";
import {
  DocsContainer,
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import { CssPropsBlock } from "@ljcl/storybook-addon-cssprops";

const parameters = {
  docs: {
    container: DocsContainer,
    page: () => {
      return (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <CssPropsBlock />
          <Stories />
        </>
      );
    },
    story: {
      inline: true,
    },
    prepareForInline: (story) => story(),
  },
  cssprops: {
    presetColors: [
      "#fdc808",
      "#6565e7",
      "#00d0ff",
      "#0059cc",
      "#2ebdba",
      "#008582",
      "#ed1d53",
      "#e7134b",
      "#ef4034",
      "#e03124",
      "#007bc2",
      "#e9f500",
    ],
  },
};

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters,
  tags: ["autodocs"],
};

export default preview;
