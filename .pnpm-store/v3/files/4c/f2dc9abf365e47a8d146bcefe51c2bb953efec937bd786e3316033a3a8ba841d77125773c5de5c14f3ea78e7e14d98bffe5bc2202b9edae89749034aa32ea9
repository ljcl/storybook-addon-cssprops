"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "wrapperJs", {
  enumerable: true,
  get: function () {
    return _sbMdxPlugin.wrapperJs;
  }
});
exports.compileSync = exports.mdxSync = exports.postprocess = exports.plugin = exports.SEPARATOR = void 0;

var _generator = _interopRequireDefault(require("@babel/generator"));

var t = _interopRequireWildcard(require("@babel/types"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _estreeToBabel = _interopRequireDefault(require("estree-to-babel"));

var _sbMdxPlugin = require("./sb-mdx-plugin");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Keeping as much code as possible from the original compiler to avoid breaking changes
const SEPARATOR = '// =========';
exports.SEPARATOR = SEPARATOR;

function extractExports(root, options) {
  const context = {
    counter: 0,
    storyNameToKey: {},
    namedExports: {}
  };
  const storyExports = [];
  const includeStories = [];
  let metaExport = null;
  const {
    code
  } = (0, _generator.default)(root, {});
  let contents;
  root.program.body.forEach(child => {
    if (t.isExpressionStatement(child) && t.isJSXFragment(child.expression)) {
      if (contents) throw new Error('duplicate contents');
      contents = child;
    } else if (t.isExportNamedDeclaration(child) && t.isVariableDeclaration(child.declaration) && child.declaration.declarations.length === 1) {
      const declaration = child.declaration.declarations[0];

      if (t.isVariableDeclarator(declaration) && t.isIdentifier(declaration.id)) {
        const {
          name
        } = declaration.id;
        context.namedExports[name] = declaration.init;
      }
    }
  });

  if (contents) {
    const jsx = contents.expression;
    jsx.children.forEach(child => {
      if (t.isJSXElement(child)) {
        if (t.isJSXIdentifier(child.openingElement.name)) {
          const name = child.openingElement.name.name;
          let stories;

          if (['Canvas', 'Preview'].includes(name)) {
            stories = (0, _sbMdxPlugin.genCanvasExports)(child, context);
          } else if (name === 'Story') {
            stories = (0, _sbMdxPlugin.genStoryExport)(child, context);
          } else if (name === 'Meta') {
            const meta = (0, _sbMdxPlugin.genMeta)(child, options);

            if (meta) {
              if (metaExport) {
                throw new Error('Meta can only be declared once');
              }

              metaExport = meta;
            }
          }

          if (stories) {
            Object.entries(stories).forEach(([key, story]) => {
              includeStories.push(key);
              storyExports.push(story);
            });
          }
        }
      } else if (t.isJSXExpressionContainer(child)) {// Skip string literals & other JSX expressions
      } else {
        throw new Error(`Unexpected JSX child: ${child.type}`);
      }
    });
  }

  if (metaExport) {
    if (!storyExports.length) {
      storyExports.push('export const __page = () => { throw new Error("Docs-only story"); };');
      storyExports.push('__page.parameters = { docsOnly: true };');
      includeStories.push('__page');
    }
  } else {
    metaExport = {};
  }

  metaExport.includeStories = JSON.stringify(includeStories);
  const fullJsx = [...storyExports, `const componentMeta = ${(0, _sbMdxPlugin.stringifyMeta)(metaExport)};`, `const mdxStoryNameToKey = ${JSON.stringify(context.storyNameToKey)};`, _sbMdxPlugin.wrapperJs, 'export default componentMeta;'].join('\n\n');
  return fullJsx;
}

const plugin = store => root => {
  const estree = store.toEstree(root); // toBabel mutates root, so we need to clone it

  const clone = (0, _cloneDeep.default)(estree);
  const babel = (0, _estreeToBabel.default)(clone);
  store.exports = extractExports(babel, {});
  return root;
};

exports.plugin = plugin;

const postprocess = (code, extractedExports) => {
  const lines = code.toString().trim().split('\n'); // /*@jsxRuntime automatic @jsxImportSource react*/

  const first = lines.shift();
  return [first, 'import { assertIsFn, AddContext } from "@storybook/addon-docs";', ...lines.filter(line => !line.match(/^export default/)), SEPARATOR, extractedExports].join('\n');
};

exports.postprocess = postprocess;

const mdxSync = code => {
  const {
    compileSync
  } = require('@mdx-js/mdx');

  const {
    toEstree
  } = require('hast-util-to-estree');

  const store = {
    exports: '',
    toEstree
  };
  const output = compileSync(code, {
    rehypePlugins: [[plugin, store]]
  });
  return postprocess(output.toString(), store.exports);
};

exports.compileSync = exports.mdxSync = mdxSync;