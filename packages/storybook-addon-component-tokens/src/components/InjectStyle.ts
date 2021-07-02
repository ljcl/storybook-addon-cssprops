import { useRef, useEffect } from "react";
import { ADDON_ID } from "../constants";
import { Args, useDocument } from "./utils";

export const useInjectStyle = (args: Args) => {
  const styleRef = useRef<HTMLStyleElement>();
  const docRef = useDocument();
  useEffect(() => {
    if (docRef.current) {
      styleRef.current = docRef.current.getElementById(
        ADDON_ID
      ) as HTMLStyleElement;
      if (!styleRef.current) {
        const styleEl = docRef.current.createElement("style");
        styleEl.id = ADDON_ID;
        styleRef.current = docRef.current.head.appendChild(styleEl);
      }
    }
  }, [docRef]);
  useEffect(() => {
    if (styleRef.current) {
      const argEntries = Object.entries(args);
      const styles = argEntries.reduce((prev, [key, value]) => {
        const [selector, prop, media] = key.split("/");
        const rule = `${selector} { ${prop}: ${value}; }\n`;
        return prev + (media ? `@media ${media} {\n  ${rule}}\n` : rule);
      }, "");
      styleRef.current.textContent = styles;
    }
  }, [args]);
};
