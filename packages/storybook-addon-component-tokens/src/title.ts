import { useParameter } from "@storybook/manager-api";
import { CssPropsParameter, PARAM_KEY } from "./constants";

export function getTitle(): string {
  const { customProperties = {} } = useParameter<CssPropsParameter>(PARAM_KEY, {
    customProperties: {},
  });
  const controlsCount = Object.values(customProperties).flat().length;
  const suffix = controlsCount === 0 ? "" : ` (${controlsCount})`;
  return `Component Tokens${suffix}`;
}
