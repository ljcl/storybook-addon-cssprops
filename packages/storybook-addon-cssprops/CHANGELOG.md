# @ljcl/storybook-addon-cssprops

## 5.0.2

### Patch Changes

- d7dc806: Fix storybook crash when visiting a story directly

## 5.0.1

### Patch Changes

- 33b7a0f: Fix type error in CssPropsBlock.tsx

## 5.0.0

### Major Changes

- f205063: Update package dependencies
- d698aaa: Storybook has made some major changes to its API and as a result support for Storybook 8 and below has been dropped.

### Minor Changes

- cf4d509: React 19
- cb4426c: Update eslint and prettier, lint all

## 4.0.0

### Major Changes

- fb1f6e99: Storybook 8 support

  Storybook has made some major changes to its API and as a result support for Storybook 7 and below has been dropped.

## 3.2.0

### Minor Changes

- 5df22e65: Fixes issue with deprecated render key and adds -- prefix to CSS prop name

## 3.1.0

### Minor Changes

- a5830c68: Fix the count displayed in the Panel Title to not include the non-css variable config keys

## 3.0.0

### Major Changes

- 79e6f560: Storybook 7 support

  Storybook has made some major changes to its API and as a result support for Storybook 6 and below has been dropped.

## 2.3.5

### Patch Changes

- 83f99c4f: Fix broken release

## 2.3.4

### Patch Changes

- 4640ab6b: install peerDependencies as devDependencies

## 2.3.3

### Patch Changes

- 37d5e47: Update storybook peerDependency requirement to ^6.4.19
- 2696d26: Update react peerDependencies to include 18

## 2.3.2

### Patch Changes

- 82da168: use storyId as key for ArgsTable to refresh values in colour control when switching stories
- 53484f0: Docs: use `window.__DOCS_CONTEXT__` as an alternate context source if `DocsContext` is not available.
- 624196a: Fix occasional crash when hitting the reset button

## 2.3.1

### Patch Changes

- 4d45471: Resolve crash when the browser has localstorage in the old format

## 2.3.0

### Minor Changes

- 43b38c4: Don't show empty quotes in the table for parameters without a default value
- f52f764: Support categories and subcategories
- bfc5e00: Hide the unnecessary ArgValue `<span>-</span>`

## 2.2.0

### Minor Changes

- 550d019: Update addon icon and metadata
- 2f405f6: Use api.getCurrentStoryData instead of useStorybookState

## 2.1.0

### Minor Changes

- 85844b1: Autodetect between colour or text when not explicitly defined

## 2.0.0

### Major Changes

- 9452771: Custom Properties are now scoped per storyId
  Improved reset functionality
  Use ArgsTable from @storybook/components
  Display default value in table
  Updating the metadata for the storybook catalogue

## 1.0.1

### Patch Changes

- 83f1d78: Allow css props with no values to be shown

## 1.0.0

### Major Changes

- f446036: Start using changesets

### Minor Changes

- e0df9b6: update dependencies and add eslint

### Patch Changes

- 96e2f87: fix warnings generated in console related to missing keys
