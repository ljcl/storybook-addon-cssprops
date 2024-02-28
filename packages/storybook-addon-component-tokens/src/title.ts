import { useParameter } from "@storybook/api";
import { CssPropsParam, PARAM_KEY } from "./constants";

export function getTitle(): string {
  const { customProperties = {} } = useParameter<CssPropsParam>(PARAM_KEY, {
    customProperties: {},
  });
  const controlsCount = Object.values(customProperties).flat().length;
  const suffix = controlsCount === 0 ? "" : ` (${controlsCount})`;
  return `Component Tokens${suffix}`;
}
