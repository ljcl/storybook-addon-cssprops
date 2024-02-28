import { FC } from "react";
import { useParameter } from "@storybook/api";
import { CssPropsParam, PARAM_KEY } from "../constants";
import { CssPropsTable } from "./CssPropsTable";
import { NoCustomPropertiesWarning } from "./NoCustomPropertiesWarning";
import { hasEntries } from "./utils";

/**
 * Used by the Storybook Addons Panel
 */
export const CssPropsPanel: FC = () => {
  const cssprops = useParameter<CssPropsParam>(PARAM_KEY, {
    customProperties: {},
  });

  return hasEntries(cssprops.customProperties) ? (
    <CssPropsTable {...cssprops} inAddonPanel={true} />
  ) : (
    <NoCustomPropertiesWarning />
  );
};
