import * as React from "react";
import { CssPropsTable } from "./CssPropsTable/CssPropsTable";
import { NoCustomPropertiesWarning } from "./NoCustomPropertiesWarning";
import { useParameter } from "@storybook/api";
import type { CssPropsParametersType } from "./CssPropsTable/types";
import { PARAM_KEY } from "../constants";

/**
 * Used by the Storybook Addons Panel
 */
export const CssPropsPanel: React.FC = () => {
  const cssprops = useParameter<CssPropsParametersType>(PARAM_KEY, {});

  const { presetColors, disable, ...customProperties } = cssprops;

  const hasCustomProperties =
    Object.values(customProperties).filter((cssprop) => !!cssprop.value)
      .length > 0;

  if (!hasCustomProperties) return <NoCustomPropertiesWarning />;

  return (
    <CssPropsTable
      presetColors={presetColors}
      customProperties={customProperties}
      inAddonPanel
    />
  );
};
