import * as React from "react";
import { FullExtractResult } from "custom-property-extract/dist/types";
import { CssPropsTable } from "./CssPropsTable";
import { NoCustomPropertiesWarning } from "./NoCustomPropertiesWarning";
import { useParameter } from "@storybook/api";
import { PARAM_KEY } from "../constants";
import { hasEntries } from "./utils";

/**
 * Used by the Storybook Addons Panel
 */
export const CssPropsPanel: React.FC = () => {
  const cssprops = useParameter<FullExtractResult>(PARAM_KEY, {});

  return hasEntries(cssprops) ? (
    <CssPropsTable customProperties={cssprops} inAddonPanel={true} />
  ) : (
    <NoCustomPropertiesWarning />
  );
};
