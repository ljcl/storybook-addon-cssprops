import preview from "../.storybook/preview";
import { Swatch } from "./Swatch";

/** This story has no custom properties and should intentionally render an empty swatch */
const meta = preview.meta({
  title: "No Custom Properties",
  component: Swatch,
  args: {
    name: "css-custom-property-1",
  },
});

export const DefaultStory = meta.story({});
