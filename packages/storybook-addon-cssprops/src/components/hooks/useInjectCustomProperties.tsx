import * as React from "react";
import { CustomPropertiesKeyValues } from "../CssPropsTable/types";

function o2s(style: React.CSSProperties) {
  let string = "";
  Object.keys(style).forEach(function (a) {
    // @ts-ignore
    string += `${a}: ${style[a]};`;
  });
  return string;
}

export const useInjectCustomProperties = (
  customProperties: CustomPropertiesKeyValues = {}
) => {
  const styles = Object.keys(customProperties)
    .filter((i) => customProperties[i])
    .reduce(
      (o, key) => ({ ...o, [`--${key}`]: customProperties[key] }),
      {}
    ) as React.CSSProperties;

  const previewRef = React.useRef<Document | undefined>(undefined);

  React.useLayoutEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "#storybook-preview-iframe"
    );
    if (iframe) {
      previewRef.current = iframe?.contentWindow?.document;
    } else if (document) {
      previewRef.current = document;
    }
  }, [customProperties]);

  React.useLayoutEffect(() => {
    const stringifiedStyles = o2s(styles);
    if (stringifiedStyles) {
      previewRef?.current?.body?.setAttribute("style", stringifiedStyles);
    }
    return () => {
      previewRef?.current?.body?.removeAttribute("style");
    };
  }, [customProperties, styles]);
};
