import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomDoc from "./Simple.mdx";
import "./style.css";

const cssprops = {
  "--color-primary": [
    { value: "#ff017d", selector: ":root" },
    { value: "blue", selector: ":root", media: "(min-width: 960px)" },
    { value: "gold", selector: ".foo" },
  ],
  "--amount-suffix-content": [{ value: '"$"', selector: '[data-lang="us"]' }],
};

export default {
  title: "Simple Component/CSF",
  parameters: {
    cssprops,
    docs: { page: CustomDoc },
  },
  component: (args) => <div className={args.className}>Hello world!</div>,
} as Meta;

export const DefaultStory: StoryObj = {
  args: {
    className: "foo",
  },
};
export const SecondaryStory: StoryObj = {};
