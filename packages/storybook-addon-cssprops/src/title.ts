import { useParameter } from "@storybook/api";
import { PARAM_KEY } from "./constants";
import { CssPropertyItemGroup } from "./components/CssPropsTable/types";

export function useTitle(): string {
  const cssprops = useParameter<CssPropertyItemGroup>(PARAM_KEY, {});
  const controlsCount = Object.values(cssprops).length;
  const suffix = controlsCount === 0 ? "" : ` (${controlsCount})`;
  return `CSS Custom Properties${suffix}`;
}
