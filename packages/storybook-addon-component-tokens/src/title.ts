import { useParameter } from "@storybook/api";
import { PARAM_KEY } from "./constants";
import { FullExtractResult } from "custom-property-extract/dist/types";

export function getTitle(): string {
  const cssprops = useParameter<FullExtractResult>(PARAM_KEY, {});
  const controlsCount = Object.values(cssprops).filter(
    (cssprop) => cssprop.length,
  ).length;
  const suffix = controlsCount === 0 ? "" : ` (${controlsCount})`;
  return `Component Tokens${suffix}`;
}
