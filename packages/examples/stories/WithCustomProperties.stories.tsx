import * as React from "react";
import preview from "../.storybook/preview";
import { Swatch } from "./Swatch";
import cssprops from "./testData";

const Swatches = ({
  cssprops,
}: {
  cssprops: Record<
    string,
    {
      value?: string;
      description?: string;
      category?: string;
      control?: "color" | "text" | string;
    }
  >;
}): React.ReactElement => (
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

const meta = preview.meta({
  title: "With Custom Properties",
  component: Swatch,
  parameters: {
    cssprops: cssprops.primary,
  },
  render: () => <Swatches cssprops={cssprops.primary} />,
});

export const DefaultStory = meta.story();

export const SecondaryStory = meta.story({
  parameters: {
    cssprops: cssprops.secondary,
  },
  render: () => <Swatches cssprops={cssprops.secondary} />,
});
