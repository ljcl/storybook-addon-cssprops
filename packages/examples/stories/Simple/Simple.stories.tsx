import * as React from "react";
import type { Meta, Story } from "@storybook/react/types-6-0";
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
  },
} as Meta;

const Swatches: Story = (args) => (
  <div className={args.className}>Hello world!</div>
);

export const DefaultStory = Swatches.bind({});
DefaultStory.args = {
  className: "foo",
};
export const SecondaryStory = Swatches.bind({});
