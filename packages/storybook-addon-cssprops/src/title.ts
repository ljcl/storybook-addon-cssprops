import { useParameter } from "@storybook/api";
import { PARAM_KEY } from "./constants";
import { CssPropTypes } from "./components/CssPropsTable/types";

export function useTitle(): string {
  const cssprops = useParameter<CssPropTypes>(PARAM_KEY, {});
  const controlsCount = Object.values(cssprops).filter(
    (cssprop) => cssprop?.value
  ).length;
  const suffix = controlsCount === 0 ? "" : ` (${controlsCount})`;
  return `CSS Custom Properties${suffix}`;
}
