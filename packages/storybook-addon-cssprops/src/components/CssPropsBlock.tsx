import * as React from "react";
import { CssPropsTable } from "./CssPropsTable/CssPropsTable";
import type {
  CssPropsParametersType,
  CssPropertyItemGroup,
} from "./CssPropsTable/types";
import { DocsContext, DocsContextProps } from "@storybook/addon-docs/blocks";

interface CssPropsBlockProps {
  customProperties: CssPropertyItemGroup;
}

declare global {
  interface Window {
    __DOCS_CONTEXT__: React.Context<DocsContextProps>;
  }
}

const useDocsContext = (): DocsContextProps => {
  const mainContext = React.useContext(DocsContext);
  const windowContext = React.useContext(
    window.__DOCS_CONTEXT__
  ) as DocsContextProps;

  const mainContextAvailable = Object.keys(mainContext).length > 0;

  return mainContextAvailable ? mainContext : windowContext;
};

/**
 * For use inside Storybook Docs and MDX
 */
export const CssPropsBlock: React.FC<CssPropsBlockProps> = (props) => {
  const overrideCustomProperties = props.customProperties;

  const context = useDocsContext();

  const cssprops: CssPropsParametersType = { ...context?.parameters?.cssprops };

  const { presetColors, disable, ...restProperties } = cssprops;

  const customProperties = overrideCustomProperties || restProperties;

  const hasCustomProperties =
    Object.values(customProperties).filter((cssprop) => !!cssprop.value)
      .length > 0;

  if (!hasCustomProperties || disable) return null;

  return (
    <CssPropsTable
      storyId={context?.id}
      presetColors={presetColors}
      customProperties={customProperties}
    />
  );
};
