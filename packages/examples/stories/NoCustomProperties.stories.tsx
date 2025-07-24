import type { Meta, StoryObj } from "@storybook/react-vite";
import { Swatch } from "./Swatch";

/** This story has no custom properties and should intentionally render an empty swatch */
export default {
  title: "No Custom Properties",
  component: Swatch,
  args: {
    name: "css-custom-property-1",
  },
} as Meta;

export const DefaultStory: StoryObj = {};
