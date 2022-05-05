const cssprops = {
  primary: {
    "css-custom-property-1": {
      value: "#fdc808",
      description: "Optional description",
      category: "Colour",
    },
    "css-custom-property-2": {
      value: "rgba(102, 102, 232, 0.79)",
      category: "Colour",
      description: `
Descriptions can be as long as you need and are formatted as markdown, just like controls!

\`\`\`css
.some-class {
  --css-custom-property-2: red;
  color: var(--css-custom-property-2);
}
\`\`\`

      `,
    },
    "css-custom-property-3": {
      value: "1vh",
      description: "Text input to set the vertical padding of each swatch",
      control: "text",
      category: "Text",
    },
    "css-custom-property-4": {
      value: "#ed1d53",
      category: "Colour",
    },
    "css-custom-property-5": {
      value: "hsla(191, 100%, 50%, 0.80)",
      category: "Colour",
      description: "Properties can also be grouped in sub categories",
      subcategory: "Sub Category",
    },
    "css-custom-property-6": {
      value: "rgba(46, 189, 186, 1)",
      category: "Colour",
      subcategory: "Sub Category",
    },
    "css-custom-property-7": {
      // Allows us to set document a CSS Custom Property without applying anything,
      description:
        "The `value` can be left intentionally blank to allow us to document a property",
      control: "color",
      category: "Colour",
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
