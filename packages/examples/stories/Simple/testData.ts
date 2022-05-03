const cssprops = {
  primary: {
    "css-custom-property-1": {
      value: "red",
      description: "Optional description",
    },
    "css-custom-property-2": {
      value: "hsl(120deg 100% 25% / 49%)",
    },
    "css-custom-property-3": {
      value: "12rem",
      description: "Text input",
      control: "text",
    },
    "css-custom-property-4": {
      // Allows us to set document a CSS Custom Property without applying anything,
      description: "The value can be left intentionally blank",
    },
  },
  secondary: {
    "css-custom-property-1": {
      value: "blue",
      description: "Optional description",
    },
    "story-only": {
      value: "green",
      description: "Not part of the default story parameters",
    },
    "css-custom-property-4": {
      value: "pink",
      description: "This story parameter overrides the parent",
    },
  },
};

export default cssprops;
