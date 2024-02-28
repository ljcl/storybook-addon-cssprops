import { FC, useMemo, useState } from "react";
import { FullCustomPropertyValue } from "custom-property-extract/dist/types";
import { components, Placeholder } from "@storybook/components";
import { PureArgsTable } from "@storybook/blocks";
import { ArgTypes, Args } from "@storybook/types";
import { CssPropsParam, Group } from "../constants";
import { isValidColor } from "./utils";
import {
  resetStorage,
  updateStorage,
  mergeCustomPropertiesWithStorage,
} from "./storage";
import { useInjectStyle } from "./useInjectStyle";

const ResetWrapper = components.resetwrapper;

type CssPropsTableProps = Partial<CssPropsParam> & { inAddonPanel?: boolean };

const groupBySelector: Group = ({
  name,
  media,
  selector,
}: FullCustomPropertyValue) => ({
  label: `${name}${media ? ` @ ${media}` : ""}`,
  category: selector,
});

export const CssPropsTable: FC<CssPropsTableProps> = ({
  customProperties = {},
  group = groupBySelector,
  inAddonPanel,
}) => {
  const customPropertiesJSON = JSON.stringify(customProperties);
  const { rows, initialArgs, argsKeys } = useMemo(
    () =>
      Object.entries(customProperties).reduce(
        (prev, [name, values]) => {
          values.forEach((item) => {
            if (!item.selector) return;
            const argKey = `${item.selector.trim()}/${name.trim()}${
              item.media ? `/${item.media}` : ""
            }`;
            prev.argsKeys.push(argKey);

            const { label, ...table } = group({ name, ...item });
            prev.rows[argKey] = {
              control: { type: isValidColor(item.value) ? "color" : "text" },
              defaultValue: item.value,
              name: label,
              table,
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
        },
      ),
    [customPropertiesJSON, group],
  );

  const [prevProps, setPrevProps] = useState(customPropertiesJSON);
  const [mergedArgs, setMergedArgs] = useState(
    mergeCustomPropertiesWithStorage(initialArgs),
  );

  if (customPropertiesJSON !== prevProps) {
    // update `mergedArgs` if customProperties changed
    // @see https://github.com/facebook/react/issues/14738
    setPrevProps(customPropertiesJSON);
    setMergedArgs(mergeCustomPropertiesWithStorage(initialArgs));
  }

  const resetArgs = () => {
    resetStorage(argsKeys);
    setMergedArgs(initialArgs);
  };

  const updateArgs = (args: Args) => {
    const storedProperties = updateStorage(args);
    setMergedArgs(
      mergeCustomPropertiesWithStorage(mergedArgs, storedProperties),
    );
  };

  useInjectStyle(mergedArgs);

  return (
    <ResetWrapper>
      {argsKeys.length ? (
        <PureArgsTable
          inAddonPanel={inAddonPanel}
          compact={true}
          updateArgs={updateArgs}
          resetArgs={resetArgs}
          rows={rows}
          args={mergedArgs}
        />
      ) : (
        <Placeholder>Please wait</Placeholder>
      )}
    </ResetWrapper>
  );
};
