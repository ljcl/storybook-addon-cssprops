import { FC } from "react";
import { useParameter } from "@storybook/manager-api";
import { CssPropsParameter, PARAM_KEY } from "../constants";
import { CssPropsTable } from "./CssPropsTable";
import { NoCustomPropertiesWarning } from "./NoCustomPropertiesWarning";
import { hasEntries } from "./utils";

/**
 * Used by the Storybook Addons Panel
 */
export const CssPropsPanel: FC = () => {
  const cssprops = useParameter<CssPropsParameter>(PARAM_KEY, {
    customProperties: {},
  });

  return hasEntries(cssprops.customProperties) ? (
    <CssPropsTable {...cssprops} inAddonPanel={true} />
  ) : (
    <NoCustomPropertiesWarning />
  );
};
