import * as React from "react";
import { CssPropsTable } from "./CssPropsTable/CssPropsTable";
import type { CssPropertyItemGroup } from "./CssPropsTable/types";
import { DocsContext } from "@storybook/addon-docs/blocks";
import { PreparedStory, Renderer } from "storybook/internal/types";

interface CssPropsBlockProps {
  customProperties: CssPropertyItemGroup;
}

declare global {
  interface Window {
    __DOCS_CONTEXT__: typeof DocsContext;
  }
}

const useDocsContext = () => {
  const mainContext = React.useContext(DocsContext);
  const windowContext = React.useContext(window.__DOCS_CONTEXT__);

  const mainContextAvailable = Object.keys(mainContext).length > 0;

  return mainContextAvailable ? mainContext : windowContext;
};

/**
 * For use inside Storybook Docs and MDX
 */
export const CssPropsBlock: React.FC<CssPropsBlockProps> = (props) => {
  const overrideCustomProperties = props.customProperties;

  const context = useDocsContext();

  // @ts-expect-error: primaryStory is a private property
  const primaryStory = (context?.primaryStory as PreparedStory<Renderer>) || {};

  const cssprops = {
    ...primaryStory?.parameters?.cssprops,
  };

  const { presetColors, disable, ...restProperties } = cssprops;

  const customProperties = overrideCustomProperties || restProperties;

  const hasCustomProperties =
    Object.values(customProperties).filter((cssprop) => !!cssprop.value)
      .length > 0;

  if (!hasCustomProperties || disable) return null;

  return (
    <CssPropsTable
      storyId={primaryStory?.id}
      presetColors={presetColors}
      customProperties={customProperties}
    />
  );
};
