"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _StoryPanel = require("./StoryPanel");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_addons.addons.register(_index.ADDON_ID, function (api) {
  _addons.addons.addPanel(_index.PANEL_ID, {
    title: 'Story',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return active ? /*#__PURE__*/_react.default.createElement(_StoryPanel.StoryPanel, {
        key: key,
        api: api
      }) : null;
    },
    paramKey: 'storysource'
  });
});