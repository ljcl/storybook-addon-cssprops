import * as React from "react";
import { FullExtractResult } from "custom-property-extract/dist/types";
import { CssPropsTable } from "./CssPropsTable";
import { DocsContext, DocsContextProps } from "@storybook/addon-docs";
import { hasEntries } from "./utils";

interface CssPropsBlockProps {
  customProperties: FullExtractResult;
}

/**
 * For use inside Storybook Docs and MDX
 */
export const CssPropsBlock: React.FC<CssPropsBlockProps> = (props) => {
  const overrideCustomProperties = props.customProperties;

  const context = React.useContext<DocsContextProps>(DocsContext);
  const cssprops: FullExtractResult = { ...context?.parameters?.cssprops };
  const customProperties = overrideCustomProperties || cssprops;

  return hasEntries(customProperties) ? (
    <CssPropsTable customProperties={customProperties} inAddonPanel={false} />
  ) : null;
};
