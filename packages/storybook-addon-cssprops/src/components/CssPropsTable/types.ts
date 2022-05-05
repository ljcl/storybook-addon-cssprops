export interface CssPropertyItem {
  control?: "text" | "color";
  value: string;
  description?: string;
  category?: string;
  subcategory?: string;
}

export interface CssPropertyItemGroup {
  [cssCustomPropertyKey: string]: CssPropertyItem;
}

/** Additional options which are removed before reaching CssPropsTable */
export type CssPropsParametersType = CssPropertyItemGroup & {
  presetColors?: string[];
  disable?: boolean;
};

/** Simple key value pairs for use when saving to storage */
export interface CustomPropertiesKeyValues {
  [customPropertyKey: string]: string;
}
