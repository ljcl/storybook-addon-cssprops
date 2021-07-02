import { ADDON_ID } from "../constants";
import { Args } from "./utils";

const getSessionStorage = (key: string): Record<string, string | never> => {
  try {
    if (window.sessionStorage) {
      const sessionStorage = window.sessionStorage.getItem(key);
      if (sessionStorage) {
        const parsedStorage = JSON.parse(sessionStorage);
        return parsedStorage;
      }
      return {};
    }
  } catch (e) {
    console.warn(
      "[storybook-addon-component-tokens]",
      "Couldn't fetch sessionStorage"
    );
  }
  return {};
};

const setSessionStorage = (
  key: string,
  data: Record<string, unknown>
): void => {
  try {
    if (data && window.sessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(data));
    }
  } catch (e) {}
};

export const updateStorage = (cssProps: Args) => {
  const propertiesFromStorage = getSessionStorage(ADDON_ID);
  const newProperties = {} as Args;
  Object.keys(cssProps).forEach((key) => {
    newProperties[key] = cssProps[key];
  });
  const newStorage = { ...propertiesFromStorage, ...newProperties };
  setSessionStorage(ADDON_ID, newStorage);
  return newStorage;
};

export const resetStorage = (cssPropNames?: string[]) => {
  const storedProperties = getSessionStorage(ADDON_ID);
  if (cssPropNames) {
    cssPropNames.forEach((cssPropName) => {
      if (cssPropName in storedProperties) {
        delete storedProperties[cssPropName];
      }
    });
  }
  setSessionStorage(ADDON_ID, storedProperties);
  return storedProperties;
};

export const mergeCustomPropertiesWithStorage = (
  fromParams: Args = {},
  fromStorage = getSessionStorage(ADDON_ID)
) => ({ ...fromParams, ...fromStorage });
