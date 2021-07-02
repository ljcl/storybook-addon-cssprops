import React from "react";
import { addParameters } from "@storybook/react";
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
import { CssPropsBlock } from "@kickstartds/storybook-addon-component-tokens";

addParameters({
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
  options: {
    showRoots: true,
  },
});
