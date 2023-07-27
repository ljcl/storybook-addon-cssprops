import { FC } from "react";
import { useOf, Of } from "@storybook/addon-docs";
import { FullExtractResult } from "custom-property-extract/dist/types";
import { CssPropsTable } from "./CssPropsTable";
import { hasEntries } from "./utils";

interface CssPropsBlockProps {
  of?: Of;
  customProperties?: FullExtractResult;
}

/**
 * For use inside Storybook Docs and MDX
 */
export const CssPropsBlock: FC<CssPropsBlockProps> = (props) => {
  let cssprops: FullExtractResult = {};

  try {
    const resolvedOf = useOf(props.of || "meta");
    const { parameters = {} } =
      resolvedOf.type === "meta"
        ? resolvedOf.csfFile.meta
        : resolvedOf.type === "story"
        ? resolvedOf.story
        : resolvedOf.type === "component"
        ? resolvedOf.projectAnnotations
        : {};
    cssprops = { ...parameters.cssprops };
  } catch (error) {}

  cssprops = props.customProperties || cssprops;

  return hasEntries(cssprops) ? (
    <CssPropsTable customProperties={cssprops} inAddonPanel={false} />
  ) : null;
};
