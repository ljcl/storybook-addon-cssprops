import { styled, ignoreSsrWarning } from "@storybook/theming";
import { opacify, transparentize, darken, lighten } from "polished";

export const TableWrapper = styled.table<{
  inAddonPanel?: boolean;
  // @ts-ignore
}>(({ theme, inAddonPanel }) => ({
  "&&": {
    // Resets for cascading/system styles
    borderCollapse: "collapse",
    borderSpacing: 0,
    color: theme.color.defaultText,

    "td, th": {
      padding: 0,
      border: "none",
      textOverflow: "ellipsis",
    },
    // End Resets

    fontSize: theme.typography.size.s2 - 1,
    lineHeight: "20px",
    textAlign: "left",
    width: "100%",

    // Margin collapse
    marginTop: inAddonPanel ? 0 : 25,
    marginBottom: inAddonPanel ? 0 : 40,

    "thead th:first-of-type, td:first-of-type": {
      // intentionally specify thead here
      width: "25%",
    },

    "th:first-of-type, td:first-of-type": {
      paddingLeft: 20,
    },

    "th:nth-of-type(2), td:nth-of-type(2)": {
      // Description column
      width: "40%",
    },

    "th:last-of-type, td:last-of-type": {
      paddingRight: 20,
      width: "35%",
    },

    th: {
      color:
        theme.base === "light"
          ? transparentize(0.25, theme.color.defaultText)
          : transparentize(0.45, theme.color.defaultText),
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
    },

    td: {
      paddingTop: "10px",
      paddingBottom: "10px",

      "&:not(:first-of-type)": {
        paddingLeft: 15,
        paddingRight: 15,
      },

      "&:last-of-type": {
        paddingRight: 20,
      },
    },

    // Table "block" styling
    // Emphasize tbody's background and set borderRadius
    // Calling out because styling tables is finicky

    // Makes border alignment consistent w/other DocBlocks
    marginLeft: inAddonPanel ? 0 : 1,
    marginRight: inAddonPanel ? 0 : 1,

    [`tr:first-child${ignoreSsrWarning}`]: {
      [`td:first-child${ignoreSsrWarning}, th:first-child${ignoreSsrWarning}`]: {
        borderTopLeftRadius: inAddonPanel ? 0 : theme.appBorderRadius,
      },
      [`td:last-child${ignoreSsrWarning}, th:last-child${ignoreSsrWarning}`]: {
        borderTopRightRadius: inAddonPanel ? 0 : theme.appBorderRadius,
      },
    },

    [`tr:last-child${ignoreSsrWarning}`]: {
      [`td:first-child${ignoreSsrWarning}, th:first-child${ignoreSsrWarning}`]: {
        borderBottomLeftRadius: inAddonPanel ? 0 : theme.appBorderRadius,
      },
      [`td:last-child${ignoreSsrWarning}, th:last-child${ignoreSsrWarning}`]: {
        borderBottomRightRadius: inAddonPanel ? 0 : theme.appBorderRadius,
      },
    },

    tbody: {
      // slightly different than the other DocBlock shadows to account for table styling gymnastics
      boxShadow:
        !inAddonPanel &&
        (theme.base === "light"
          ? `rgba(0, 0, 0, 0.10) 0 1px 3px 1px,
          ${transparentize(0.035, theme.appBorderColor)} 0 0 0 1px`
          : `rgba(0, 0, 0, 0.20) 0 2px 5px 1px,
          ${opacify(0.05, theme.appBorderColor)} 0 0 0 1px`),
      borderRadius: theme.appBorderRadius,

      // for safari only
      // CSS hack courtesy of https://stackoverflow.com/questions/16348489/is-there-a-css-hack-for-safari-only-not-chrome
      "@media not all and (min-resolution:.001dpcm)": {
        "@supports (-webkit-appearance:none)": {
          borderWidth: 1,
          borderStyle: "solid",
          borderColor:
            !inAddonPanel &&
            (theme.base === "light"
              ? transparentize(0.035, theme.appBorderColor)
              : opacify(0.05, theme.appBorderColor)),
        },
      },

      tr: {
        background: "transparent",
        overflow: "hidden",
        ...(inAddonPanel
          ? {
              borderTopWidth: 1,
              borderTopStyle: "solid",
              borderTopColor:
                theme.base === "light"
                  ? darken(0.1, theme.background.content)
                  : lighten(0.05, theme.background.content),
            }
          : {
              [`&:not(:first-child${ignoreSsrWarning})`]: {
                borderTopWidth: 1,
                borderTopStyle: "solid",
                borderTopColor:
                  theme.base === "light"
                    ? darken(0.1, theme.background.content)
                    : lighten(0.05, theme.background.content),
              },
            }),
      },

      td: {
        background: theme.background.content,
      },
    },
    // End finicky table styling
  },
}));

export const ResetButton = styled.button(({ theme }) => ({
  border: 0,
  borderRadius: "3em",
  cursor: "pointer",
  display: "inline-block",
  overflow: "hidden",
  padding: "3px 8px",
  transition: "all 150ms ease-out",
  verticalAlign: "top",
  userSelect: "none",
  margin: 0,

  backgroundColor: theme.base === "light" ? "#EAF3FC" : theme.color.border,
  boxShadow:
    theme.base === "light"
      ? `${theme.color.border} 0 0 0 1px inset`
      : `${theme.color.darker}  0 0 0 1px inset`,
  color: theme.color.secondary,

  "&:hover": {
    background:
      theme.base === "light"
        ? darken(0.03, "#EAF3FC")
        : opacify(0.1, theme.color.border),
  },

  "&:focus": {
    boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    outline: "none",
  },

  svg: {
    display: "block",
    height: 14,
    width: 14,
  },
}));

export const CssPropsHeadingWrapper = styled.span({
  display: "flex",
  justifyContent: "space-between",
});
