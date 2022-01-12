import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Swatch } from "../Swatch";

const cssprops = {
  "css-custom-property-1": {
    value: "red",
    description: "Optional description",
  },
  "css-custom-property-2": {
    value: "hsl(120deg 100% 25% / 49%)",
  },
  "css-custom-property-3": {
    value: "12rem",
    description: "Text input",
    control: "text",
  },
  "css-custom-property-4": {
    // Allows us to set document a CSS Custom Property without applying anything,
    description: "The value can be left intentionally blank",
  },
};

export default {
  title: "Simple Component/CSF",
  parameters: {
    cssprops,
  },
} as Meta;

export const DefaultStory: StoryObj = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {Object.keys(cssprops)
        .filter((cssprop) => cssprops[cssprop]?.control !== "text")
        .map((cssprop) => (
          <Swatch name={cssprop} key={cssprop} />
        ))}
    </div>
  ),
};

export const SecondaryStory: StoryObj = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {Object.keys(cssprops)
        .filter((cssprop) => cssprops[cssprop]?.control !== "text")
        .map((cssprop) => (
          <Swatch name={cssprop} key={cssprop} />
        ))}
    </div>
  ),
  parameters: {
    cssprops: {
      "story-only": {
        value: "green",
        description: "Not part of the default story parameters",
      },
      "css-custom-property-4": {
        value: "pink",
        description: "This story parameter overrides the parent",
      },
    },
  },
};
