import * as React from "react";
import { CssPropsTable } from "./CssPropsTable/CssPropsTable";
import type {
  CssPropsParametersType,
  CssPropTypes,
} from "./CssPropsTable/types";
import { DocsContext, DocsContextProps } from "@storybook/addon-docs/blocks";

interface CssPropsBlockProps {
  customProperties: CssPropTypes;
}

/**
 * For use inside Storybook Docs and MDX
 */
export const CssPropsBlock: React.FC<CssPropsBlockProps> = (props) => {
  const overrideCustomProperties = props.customProperties;

  const context = React.useContext<DocsContextProps>(DocsContext);
  const cssprops: CssPropsParametersType = { ...context?.parameters?.cssprops };

  const { presetColors, disable, ...restProperties } = cssprops;

  const customProperties = overrideCustomProperties || restProperties;

  const hasCustomProperties =
    Object.values(customProperties).filter((cssprop) => !!cssprop.value)
      .length > 0;

  if (!hasCustomProperties || disable) return null;

  return (
    <CssPropsTable
      presetColors={presetColors}
      customProperties={customProperties}
    />
  );
};
