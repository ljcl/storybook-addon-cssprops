import { CssPropTypes, CssProps } from "./types";
import { ADDON_ID } from "../../constants";

function getLocalStorage(key: string): Record<string, string | never> {
  try {
    if (window.localStorage) {
      const localStorage = window.localStorage.getItem(key);
      if (localStorage) {
        const parsedStorage = JSON.parse(localStorage);
        return parsedStorage;
      }
      return {};
    }
  } catch (e) {
    console.warn("[storybook-addon-cssprops]", "Couldn't fetch localStorage");
  }
  return {};
}

function setLocalStorage(key: string, data: Record<string, unknown>): void {
  try {
    if (data && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (e) {
    return undefined;
  }
}

/** Put only the keys and values in storage for later. */
export const updateStorage = (cssProps: CssProps) => {
  const propertiesFromStorage = getLocalStorage(ADDON_ID);
  const newProperties = {} as CssProps;
  Object.keys(cssProps).forEach((key) => {
    newProperties[key] = cssProps[key];
  });
  const newStorage = { ...propertiesFromStorage, ...newProperties };
  setLocalStorage(ADDON_ID, newStorage);
  return newStorage;
};

/** Put only the keys and values in storage for later. */
export const resetStorage = (cssPropNames?: string[]) => {
  let newProperties = getLocalStorage(ADDON_ID);
  if (cssPropNames) {
    cssPropNames.forEach((cssPropName) => {
      if (cssPropName in newProperties) {
        delete newProperties[cssPropName];
      }
    });
  } else {
    newProperties = {};
  }
  setLocalStorage(ADDON_ID, newProperties);
  return newProperties;
};

function mergeCustomPropertiesWithStorage(
  fromParams: CssPropTypes = {},
  fromStorage = getLocalStorage(ADDON_ID)
) {
  const mergedParams = { ...fromParams };
  Object.keys(mergedParams).forEach((paramName) => {
    const localValue = fromStorage[paramName];
    if (localValue) {
      mergedParams[paramName].value = localValue;
    }
  });
  return mergedParams;
}

export { getLocalStorage, setLocalStorage, mergeCustomPropertiesWithStorage };
