import * as React from "react";
import { addons, types } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { API } from "@storybook/manager-api";
import { CssPropsPanel } from "./components/CssPropsPanel";
import { useTitle } from "./title";
import { ADDON_ID, PARAM_KEY } from "./constants";

addons.register(ADDON_ID, (api: API) => {
  addons.add(ADDON_ID, {
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
