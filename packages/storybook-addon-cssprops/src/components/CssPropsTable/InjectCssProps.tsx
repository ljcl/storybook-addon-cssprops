import * as React from "react";
import { CssPropTypes } from "./types";

function o2s(style: React.CSSProperties) {
  let string = "";
  Object.keys(style).forEach(function (a) {
    // @ts-ignore
    string += `${a}: ${style[a]};`;
  });
  return string;
}

export const useInjectCustomProperties = (customProperties: CssPropTypes) => {
  const styles = Object.keys(customProperties)
    .filter((i) => customProperties[i].value)
    .reduce(
      (o, key) => ({ ...o, [`--${key}`]: customProperties[key].value }),
      {}
    ) as React.CSSProperties;

  const previewRef = React.useRef<Document | undefined>();

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
    previewRef?.current?.body.setAttribute("style", stringifiedStyles);
  }, [customProperties]);
};
