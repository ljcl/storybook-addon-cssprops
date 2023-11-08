import React from "react";
import {
  DocsContainer,
  Title,
  Subtitle,
  Description,
  Primary,
  ArgTypes,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { CssPropsBlock } from "@kickstartds/storybook-addon-component-tokens";

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
          <ArgTypes story={PRIMARY_STORY} />
          <CssPropsBlock />
          <Stories />
        </>
      );
    },
    prepareForInline: (story) => story(),
  },
  options: {
    sidebar: {
      showRoots: true,
    },
  },
};
