import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Swatch } from "../Swatch";
import cssprops from "./testData";

const Swatches = ({ cssprops }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
    }}
  >
    {Object.keys(cssprops)
      .filter((cssprop) => cssprops[cssprop]?.control !== "text")
      .map((cssprop) => (
        <Swatch name={cssprop} key={cssprop} />
      ))}
  </div>
);

export default {
  title: "Simple Component/CSF",
  component: Swatch,
  parameters: {
    cssprops: cssprops.primary,
  },
  render: () => <Swatches cssprops={cssprops.primary} />,
} as Meta;

export const DefaultStory: StoryObj = {
  parameters: {
    cssprops: cssprops.secondary,
  },
};

export const SecondaryStory: StoryObj = {
  parameters: {
    cssprops: cssprops.secondary,
  },
  render: () => <Swatches cssprops={cssprops.secondary} />,
};
