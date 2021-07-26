import * as React from "react";
import type { Meta, Story } from "@storybook/react/types-6-0";
import "./style.css";

const cssprops = {
  "--width": [
    { value: "100%", selector: ":root" }
  ],
};

export default {
  title: "Simple Component/CSF 2",
  parameters: {
    cssprops,
  },
} as Meta;

const Swatches: Story = () => (
  <div>Lorem Ipsum</div>
);

export const DefaultStory = Swatches.bind({});
