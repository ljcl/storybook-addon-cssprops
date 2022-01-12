import * as React from "react";
import { CssProps, CssPropType } from "./types";
import { ColorControl, TextControl } from "@storybook/components";

export interface CssPropControlProps {
  row: CssPropType;
  presetColors?: string[];
  updateStorage: (cssProp: CssProps) => void;
}

const NoControl = () => <React.Fragment key="none">-</React.Fragment>;

export const CssPropControl: React.FC<CssPropControlProps> = ({
  row,
  presetColors,
  updateStorage,
}) => {
  const { name, control = "color", value } = row;

  const [isFocused, setFocused] = React.useState(false);
  const [boxedValue, setBoxedValue] = React.useState({ value });

  const onChange = React.useCallback(
    (cssPropVal: any) => {
      setBoxedValue({ value: cssPropVal });
      updateStorage({ [name]: cssPropVal });
      return cssPropVal;
    },
    [updateStorage, name]
  );

  React.useEffect(() => {
    if (!isFocused) {
      setBoxedValue({ value });
    }
  }, [row]);

  const onBlur = React.useCallback(() => setFocused(false), []);
  const onFocus = React.useCallback(() => setFocused(true), []);

  if (!control) return <NoControl />;

  const props = {
    name,
    value: boxedValue.value,
    onChange,
    onBlur,
    onFocus,
  };

  switch (control) {
    case "color":
      return <ColorControl {...props} presetColors={presetColors} />;
    case "text":
      return <TextControl {...props} />;
    default:
      return <NoControl />;
  }
};
