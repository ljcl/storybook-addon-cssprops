import * as React from "react";
import { FullExtractResult } from "custom-property-extract/dist/types";
import {
  ResetWrapper,
  ArgsTable,
  ArgsTableRowProps,
  ArgTypes,
} from "@storybook/components";
import { isValidColor, Args } from "./utils";
import {
  resetStorage,
  updateStorage,
  mergeCustomPropertiesWithStorage,
} from "./storage";
import { useInjectStyle } from "./InjectStyle";

interface CssPropsTableRowProps {
  customProperties: FullExtractResult;
  inAddonPanel?: boolean;
}

export const CssPropsTable: React.FC<CssPropsTableRowProps> = ({
  customProperties = {},
  inAddonPanel,
}) => {
  const customPropertiesEntries = Object.entries(customProperties);
  const { rows, initialArgs, argsKeys } = React.useMemo(
    () =>
      customPropertiesEntries.reduce(
        (prev, [key, values]) => {
          values.forEach((item) => {
            if (!item.selector) return;
            const argKey = `${item.selector.trim()}/${key.trim()}${
              item.media ? `/${item.media}` : ""
            }`;
            prev.argsKeys.push(argKey);
            prev.rows[argKey] = {
              control: { type: isValidColor(item.value) ? "color" : "text" },
              defaultValue: item.value,
              name: `${key}${item.media ? ` @ ${item.media}` : ""}`,
              table: {
                category: item.selector,
              },
              description: item.name,
              key: argKey,
              type: { name: "string" },
            };
            prev.initialArgs[argKey] = item.value;
          });
          return prev;
        },
        {
          rows: {} as ArgTypes,
          initialArgs: {} as Args,
          argsKeys: [] as string[],
        }
      ),
    [customProperties]
  );

  const [mergedArgs, setMergedArgs] = React.useState(
    mergeCustomPropertiesWithStorage(initialArgs)
  );

  const resetArgs = () => {
    resetStorage(argsKeys);
    setMergedArgs(initialArgs);
  };

  const updateArgs: ArgsTableRowProps["updateArgs"] = (args) => {
    const storedProperties = updateStorage(args);
    setMergedArgs(
      mergeCustomPropertiesWithStorage(mergedArgs, storedProperties)
    );
  };

  useInjectStyle(mergedArgs);

  return (
    <ResetWrapper>
      {argsKeys.length ? (
        <ArgsTable
          inAddonPanel={inAddonPanel}
          compact={false}
          updateArgs={updateArgs}
          resetArgs={resetArgs}
          rows={rows}
          args={mergedArgs}
        />
      ) : (
        "Bitte warten"
      )}
    </ResetWrapper>
  );
};
