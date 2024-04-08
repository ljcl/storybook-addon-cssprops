import { FullExtractResult } from "custom-property-extract/dist/types";

export const PARAM_KEY = "cssprops" as const;
export const ADDON_ID = "addon-component-tokens" as const;
export type Group = {
  label: string;
  category?: string;
  subcategory?: string;
};
export type CssPropsParameter = {
  customProperties?: FullExtractResult;
  group?: Group;
};
