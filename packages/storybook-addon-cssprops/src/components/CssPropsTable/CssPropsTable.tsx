import * as React from "react";
import { ArgsTable, ArgTypes } from "@storybook/components";
import { useInjectCustomProperties } from "../hooks/useInjectCustomProperties";
import { CssPropertyItemGroup, CustomPropertiesKeyValues } from "./types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ADDON_ID } from "../../constants";

export interface CssPropsTableProps {
  customProperties: CssPropertyItemGroup;
  presetColors?: string[];
  storyId?: string;
  inAddonPanel?: boolean;
}

const reduceCssPropertyItemGroupToValue = (
  customProperties: CssPropertyItemGroup
) => {
  const newParams: CustomPropertiesKeyValues = {};
  Object.keys(customProperties).forEach((key) => {
    newParams[key] = customProperties[key].value;
  });
  return newParams;
};

const detectControlType = (value: string) =>
  CSS.supports("color", value) ? "color" : "text";

const formatForArgsTable = ({
  customProperties,
  presetColors,
  storyId,
  initialCustomProperties,
}: {
  customProperties: CssPropertyItemGroup;
  storyId: string;
  presetColors?: string[];
  initialCustomProperties?: {
    [storyId: string]: CustomPropertiesKeyValues;
  };
}) =>
  Object.keys(customProperties).reduce((previousValue, currentValue) => {
    const customProperty = customProperties[currentValue];
    const initialCustomProperty =
      initialCustomProperties?.[storyId]?.[currentValue] || undefined;
    const description = customProperty.description || "";

    const value = customProperties[currentValue].value;

    previousValue[currentValue] = {
      name: currentValue,
      description,
      category: "",
      control: {
        type: customProperty.control || detectControlType(value),
        value: value,
        presetColors,
      },
      table: {
        category: customProperty.category,
        subcategory: customProperty.subcategory,
        defaultValue: {
          summary: initialCustomProperty,
        },
      },
    };
    return previousValue;
  }, {} as ArgTypes);

const mergeCustomPropertiesWithStoredPropertiesAndFormatForArgsTable = ({
  customProperties,
  storageProperties = {},
  initialCustomProperties,
  storyId,
  presetColors,
}: {
  customProperties: CssPropertyItemGroup;
  storageProperties: CustomPropertiesKeyValues;
  initialCustomProperties: {
    [storyId: string]: CustomPropertiesKeyValues;
  };
  storyId: string;
  presetColors?: string[];
}) => {
  const updatedCustomProperties: CssPropertyItemGroup = { ...customProperties };
  Object.keys(customProperties).forEach((key) => {
    if (storageProperties[key]) {
      updatedCustomProperties[key].value = storageProperties[key];
    }
  });
  return formatForArgsTable({
    customProperties: updatedCustomProperties,
    initialCustomProperties,
    storyId,
    presetColors,
  });
};

export const CssPropsTable = ({
  customProperties = {},
  presetColors,
  storyId = "unknown-story",
  inAddonPanel,
}: CssPropsTableProps) => {
  const customPropertyValues = reduceCssPropertyItemGroupToValue(
    customProperties
  );

  const [storedProperties, setStoredProperties] = useLocalStorage<{
    customProperties: {
      [storyId: string]: CustomPropertiesKeyValues;
    };
    initialCustomProperties: {
      [storyId: string]: CustomPropertiesKeyValues;
    };
  }>({
    key: ADDON_ID,
    defaultValue: {
      customProperties: { [storyId]: customPropertyValues },
      initialCustomProperties: { [storyId]: customPropertyValues },
    },
  });

  React.useEffect(() => {
    if (!storedProperties.initialCustomProperties[storyId]) {
      setStoredProperties({
        customProperties: storedProperties.customProperties,
        initialCustomProperties: {
          ...storedProperties.initialCustomProperties,
          [storyId]: customPropertyValues,
        },
      });
    }
  }, [customPropertyValues, setStoredProperties, storedProperties, storyId]);

  React.useEffect(() => {
    if (!storedProperties.initialCustomProperties[storyId]) {
      setStoredProperties({
        customProperties: {
          ...storedProperties.customProperties,
          [storyId]: customPropertyValues,
        },
        initialCustomProperties: {
          ...storedProperties.initialCustomProperties,
          [storyId]: customPropertyValues,
        },
      });
    }
  }, [
    customPropertyValues,
    setStoredProperties,
    storedProperties.customProperties,
    storedProperties.initialCustomProperties,
    storyId,
  ]);

  const [rows, setRows] = React.useState(
    formatForArgsTable({
      customProperties,
      presetColors,
      storyId,
      initialCustomProperties: storedProperties.initialCustomProperties,
    })
  );

  const handleUpdateStorage = (args: CustomPropertiesKeyValues) => {
    const newProperties = {} as CustomPropertiesKeyValues;

    Object.keys(args).forEach((key) => {
      newProperties[key] = args[key];
    });
    const mergedProperties = {
      ...storedProperties.customProperties[storyId],
      ...newProperties,
    };
    setStoredProperties({
      ...storedProperties,
      customProperties: {
        ...storedProperties.customProperties,
        [storyId]: mergedProperties,
      },
    });
    const newRows = mergeCustomPropertiesWithStoredPropertiesAndFormatForArgsTable(
      {
        customProperties,
        storageProperties: mergedProperties,
        initialCustomProperties: storedProperties.initialCustomProperties,
        storyId,
        presetColors,
      }
    );
    setRows(newRows);
  };

  useInjectCustomProperties(storedProperties.customProperties[storyId]);

  const handleResetProps = () => {
    setStoredProperties({
      customProperties: {
        ...storedProperties.customProperties,
        [storyId]: storedProperties.initialCustomProperties[storyId],
      },
      initialCustomProperties: storedProperties.initialCustomProperties,
    });
    // We can't reset the args table colour control unfortunately :/
    // Clear the storage and reload for now.
    window.location.reload();
  };

  React.useEffect(() => {
    const newRows = mergeCustomPropertiesWithStoredPropertiesAndFormatForArgsTable(
      {
        customProperties,
        storageProperties: storedProperties.customProperties[storyId],
        initialCustomProperties: storedProperties.initialCustomProperties,
        storyId,
        presetColors,
      }
    );
    setRows(newRows);
  }, [customProperties, presetColors, storedProperties, storyId]);

  return (
    <ArgsTable
      inAddonPanel={inAddonPanel}
      resetArgs={handleResetProps}
      rows={rows}
      updateArgs={(arg) => {
        const [name] = Object.keys(arg);
        const value = arg[name];
        handleUpdateStorage({ [name]: value });
      }}
    />
  );
};
