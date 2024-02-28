import { FC } from "react";
import { useOf, Of } from "@storybook/addon-docs";
import { PARAM_KEY, CssPropsParam } from "../constants";
import { CssPropsTable } from "./CssPropsTable";
import { hasEntries } from "./utils";

type CssPropsBlockProps = Partial<CssPropsParam> & { of?: Of };

/**
 * For use inside Storybook Docs and MDX
 */
export const CssPropsBlock: FC<CssPropsBlockProps> = ({
  of = "meta",
  ...cssprops
}) => {
  try {
    const resolvedOf = useOf(of);
    const { parameters = {} } =
      resolvedOf.type === "meta"
        ? resolvedOf.csfFile.meta
        : resolvedOf.type === "story"
        ? resolvedOf.story
        : resolvedOf.type === "component"
        ? resolvedOf.projectAnnotations
        : {};

    if (parameters[PARAM_KEY]) {
      cssprops = parameters[PARAM_KEY];
    }
  } catch (error) {}

  return hasEntries(cssprops.customProperties) ? (
    <CssPropsTable {...cssprops} inAddonPanel={false} />
  ) : null;
};
