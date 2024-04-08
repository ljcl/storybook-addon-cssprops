import { useRef, useEffect } from "react";
import { FullCustomPropertyValue } from "custom-property-extract/dist/types";
import { Group } from "../constants";

export const hasEntries = (customProperties?: { [key: string]: any }) =>
  !!(customProperties && Object.keys(customProperties).length);

// https://www.regextester.com/103656
const colorRe =
  /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/i;
const varRe = /^(var|calc|\d|\.)/;

const memo: { [name: string]: boolean } = {};
export const isValidColor = (strColor: string) => {
  if (!(strColor in memo)) {
    if (varRe.test(strColor)) {
      memo[strColor] = false;
    } else if (colorRe.test(strColor)) {
      memo[strColor] = true;
    } else {
      const s = new Option().style;
      s.color = strColor;
      memo[strColor] = s.color === strColor.toLowerCase();
    }
  }
  return memo[strColor];
};

export const useDocument = () => {
  const docRef = useRef<Document>();
  useEffect(() => {
    const iframe = document.getElementById(
      "storybook-preview-iframe",
    ) as HTMLIFrameElement | null;
    docRef.current = iframe?.contentWindow?.document || document;
  }, []);
  return docRef;
};

export const groupBySelector: Group = {
  label: "{{name}}{{#if media}} @ {{media}}{{/if}}",
  category: "{{selector}}",
};
