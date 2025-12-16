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
import { definePreview } from "@storybook/react-vite";
import addonDocs from "@storybook/addon-docs";
import addonCssProps, { CssPropsBlock } from "@ljcl/storybook-addon-cssprops";

export default definePreview({
  tags: ["autodocs"],
  addons: [addonCssProps(), addonDocs()],
  parameters: {
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
  },
});
