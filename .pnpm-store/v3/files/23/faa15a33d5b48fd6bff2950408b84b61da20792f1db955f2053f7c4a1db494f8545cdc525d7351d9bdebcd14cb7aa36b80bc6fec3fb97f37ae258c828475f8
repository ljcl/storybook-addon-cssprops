import React from 'react';
import { addons } from '@storybook/addons';
import { StoryPanel } from './StoryPanel';
import { ADDON_ID, PANEL_ID } from './index';
addons.register(ADDON_ID, function (api) {
  addons.addPanel(PANEL_ID, {
    title: 'Story',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return active ? /*#__PURE__*/React.createElement(StoryPanel, {
        key: key,
        api: api
      }) : null;
    },
    paramKey: 'storysource'
  });
});