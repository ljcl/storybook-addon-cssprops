import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { API } from "@storybook/api";
import { CssPropsPanel } from "./components/CssPropsPanel";
import { getTitle } from "./title";
import { ADDON_ID, PARAM_KEY } from "./constants";

addons.register(ADDON_ID, (api: API) => {
  addons.addPanel(ADDON_ID, {
    title: getTitle,
    type: types.PANEL,
    paramKey: PARAM_KEY,
    render: ({ active }) => (
      <AddonPanel active={!!active}>
        <CssPropsPanel />
      </AddonPanel>
    ),
  });
});
