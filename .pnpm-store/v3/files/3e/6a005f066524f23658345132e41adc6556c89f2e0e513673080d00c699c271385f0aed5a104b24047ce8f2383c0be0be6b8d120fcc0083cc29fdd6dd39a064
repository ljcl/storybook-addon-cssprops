import "core-js/modules/es.symbol.js";
var _excluded = ["properties"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.string.ends-with.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.assign.js";
import React from 'react';
import { useParameter } from '@storybook/api';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/router';
import { SyntaxHighlighter } from '@storybook/components'; // @ts-expect-error Typedefs don't currently expose `createElement` even though it exists

import { createElement as createSyntaxHighlighterElement } from 'react-syntax-highlighter';
var StyledStoryLink = styled(Link)(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'block',
    textDecoration: 'none',
    borderRadius: theme.appBorderRadius,
    color: 'inherit',
    '&:hover': {
      background: theme.background.hoverable
    }
  };
});
var SelectedStoryHighlight = styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    background: theme.background.hoverable,
    borderRadius: theme.appBorderRadius
  };
});
var StyledSyntaxHighlighter = styled(SyntaxHighlighter)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: theme.typography.size.s2 - 1
  };
});

var areLocationsEqual = function areLocationsEqual(a, b) {
  return a.startLoc.line === b.startLoc.line && a.startLoc.col === b.startLoc.col && a.endLoc.line === b.endLoc.line && a.endLoc.col === b.endLoc.col;
};

export var StoryPanel = function StoryPanel(_ref4) {
  var api = _ref4.api;
  var story = api.getCurrentStoryData();
  var selectedStoryRef = React.useRef(null);

  var _useParameter = useParameter('storySource', {
    source: 'loading source...'
  }),
      source = _useParameter.source,
      locationsMap = _useParameter.locationsMap;

  var currentLocation = locationsMap ? locationsMap[Object.keys(locationsMap).find(function (key) {
    var sourceLoaderId = key.split('--');
    return story.id.endsWith(sourceLoaderId[sourceLoaderId.length - 1]);
  })] : undefined;
  React.useEffect(function () {
    if (selectedStoryRef.current) {
      selectedStoryRef.current.scrollIntoView();
    }
  }, [selectedStoryRef.current]);

  var createPart = function createPart(_ref5) {
    var rows = _ref5.rows,
        stylesheet = _ref5.stylesheet,
        useInlineStyles = _ref5.useInlineStyles;
    return rows.map(function (node, i) {
      return createSyntaxHighlighterElement({
        node: node,
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles,
        key: "code-segment".concat(i)
      });
    });
  };

  var createStoryPart = function createStoryPart(_ref6) {
    var rows = _ref6.rows,
        stylesheet = _ref6.stylesheet,
        useInlineStyles = _ref6.useInlineStyles,
        location = _ref6.location,
        id = _ref6.id,
        refId = _ref6.refId;
    var first = location.startLoc.line - 1;
    var last = location.endLoc.line;
    var storyRows = rows.slice(first, last);
    var storySource = createPart({
      rows: storyRows,
      stylesheet: stylesheet,
      useInlineStyles: useInlineStyles
    });
    var storyKey = "".concat(first, "-").concat(last);

    if (currentLocation && areLocationsEqual(location, currentLocation)) {
      return /*#__PURE__*/React.createElement(SelectedStoryHighlight, {
        key: storyKey,
        ref: selectedStoryRef
      }, storySource);
    }

    return /*#__PURE__*/React.createElement(StyledStoryLink, {
      to: refId ? "/story/".concat(refId, "_").concat(id) : "/story/".concat(id),
      key: storyKey
    }, storySource);
  };

  var createParts = function createParts(_ref7) {
    var rows = _ref7.rows,
        stylesheet = _ref7.stylesheet,
        useInlineStyles = _ref7.useInlineStyles;
    var parts = [];
    var lastRow = 0;
    Object.keys(locationsMap).forEach(function (key) {
      var location = locationsMap[key];
      var first = location.startLoc.line - 1;
      var last = location.endLoc.line;
      var kind = story.kind,
          refId = story.refId; // source loader ids are different from story id

      var sourceIdParts = key.split('--');
      var id = api.storyId(kind, sourceIdParts[sourceIdParts.length - 1]);
      var start = createPart({
        rows: rows.slice(lastRow, first),
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles
      });
      var storyPart = createStoryPart({
        rows: rows,
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles,
        location: location,
        id: id,
        refId: refId
      });
      parts.push(start);
      parts.push(storyPart);
      lastRow = last;
    });
    var lastPart = createPart({
      rows: rows.slice(lastRow),
      stylesheet: stylesheet,
      useInlineStyles: useInlineStyles
    });
    parts.push(lastPart);
    return parts;
  };

  var lineRenderer = function lineRenderer(_ref8) {
    var rows = _ref8.rows,
        stylesheet = _ref8.stylesheet,
        useInlineStyles = _ref8.useInlineStyles;
    // because of the usage of lineRenderer, all lines will be wrapped in a span
    // these spans will receive all classes on them for some reason
    // which makes colours cascade incorrectly
    // this removed that list of classnames
    var myrows = rows.map(function (_ref9) {
      var properties = _ref9.properties,
          rest = _objectWithoutProperties(_ref9, _excluded);

      return Object.assign({}, rest, {
        properties: {
          className: []
        }
      });
    });

    if (!locationsMap || !Object.keys(locationsMap).length) {
      return createPart({
        rows: myrows,
        stylesheet: stylesheet,
        useInlineStyles: useInlineStyles
      });
    }

    var parts = createParts({
      rows: myrows,
      stylesheet: stylesheet,
      useInlineStyles: useInlineStyles
    });
    return /*#__PURE__*/React.createElement("span", null, parts);
  };

  return story ? /*#__PURE__*/React.createElement(StyledSyntaxHighlighter, {
    language: "jsx",
    showLineNumbers: true,
    renderer: lineRenderer,
    format: false,
    copyable: false,
    padded: true
  }, source) : null;
};