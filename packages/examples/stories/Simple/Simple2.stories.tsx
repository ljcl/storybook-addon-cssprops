import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./style.css";

const customProperties = {
  "--width": [{ value: "100%", selector: ":root" }],
};

export default {
  title: "Simple Component/CSF 2",
  parameters: {
    cssprops: { customProperties },
  },
  component: () => <div>Lorem Ipsum</div>,
} as Meta;

export const DefaultStory: StoryObj = {};
