export interface CssPropType {
  name: string;
  control?: "text" | "color";
  value: string;
  description?: string;
}

export interface CssPropTypes {
  [name: string]: CssPropType;
}

/** Additional options which are removed before reaching CssPropsTable */
export type CssPropsParametersType = CssPropTypes & {
  presetColors?: string[];
  disable?: boolean;
};

/** Simple key value pairs for use when saving to storage */
export interface CssProps {
  [cssCustomPropertyKey: string]: string;
}
