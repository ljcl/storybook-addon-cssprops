import * as React from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { API } from "@storybook/api";
import { CssPropsPanel } from "./components/CssPropsPanel";
import { useTitle } from "./title";
import { ADDON_ID, PARAM_KEY } from "./constants";

addons.register(ADDON_ID, (api: API) => {
  addons.addPanel(ADDON_ID, {
    title: useTitle,
    type: types.PANEL,
    paramKey: PARAM_KEY,
    render: ({ active }) => {
      const story = api.getCurrentStoryData();
      if (!active || !story) {
        return <React.Fragment key="nothing">-</React.Fragment>;
      }
      return (
        <AddonPanel active={!!active}>
          <CssPropsPanel storyId={story.id} />
        </AddonPanel>
      );
    },
  });
});
