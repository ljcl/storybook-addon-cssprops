import React from "react";
import {
  DocsContainer,
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { CssPropsBlock } from "@ljcl/storybook-addon-cssprops";

export const parameters = {
  docs: {
    container: DocsContainer,
    page: () => {
      return (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <CssPropsBlock />
          <Stories />
        </>
      );
    },
    inlineStories: true,
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
