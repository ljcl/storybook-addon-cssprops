"use strict";

var _tsDedent = require("ts-dedent");

var _prettier = _interopRequireDefault(require("prettier"));

var _mdx = require("./mdx2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
expect.addSnapshotSerializer({
  print: val => val,
  test: val => true
});

const clean = mdx => {
  const code = (0, _mdx.compileSync)(mdx);
  const trimmed = code.split(_mdx.SEPARATOR)[1].split(_mdx.wrapperJs)[0];
  return _prettier.default.format(trimmed, {
    parser: 'babel',
    printWidth: 100,
    tabWidth: 2,
    bracketSpacing: true,
    trailingComma: 'es5',
    singleQuote: true
  }).trim();
};

describe('mdx2', () => {
  it('works', () => {
    const input = (0, _tsDedent.dedent)`
      # hello

      <Meta title="foobar" />

      world {2 + 1}

      <Story name="foo">bar</Story>
    `; // @ts-ignore

    expect(clean(input)).toMatchInlineSnapshot(`
      export const foo = () => 'bar';
      foo.storyName = 'foo';
      foo.parameters = { storySource: { source: '"bar"' } };

      const componentMeta = { title: 'foobar', includeStories: ['foo'] };

      const mdxStoryNameToKey = { foo: 'foo' };
    `);
  });
  it('full snapshot', () => {
    const input = (0, _tsDedent.dedent)`
      # hello

      <Meta title="foobar" />

      world {2 + 1}

      <Story name="foo">bar</Story>
    `; // @ts-ignore

    expect((0, _mdx.compileSync)(input)).toMatchInlineSnapshot(`
      /*@jsxRuntime automatic @jsxImportSource react*/
      import { assertIsFn, AddContext } from "@storybook/addon-docs";
      import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
      function MDXContent(props = {}) {
        const {wrapper: MDXLayout} = props.components || ({});
        return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
          children: _jsx(_createMdxContent, {})
        })) : _createMdxContent();
        function _createMdxContent() {
          const _components = Object.assign({
            h1: "h1",
            p: "p"
          }, props.components), {Meta, Story} = _components;
          if (!Meta) _missingMdxReference("Meta", true);
          if (!Story) _missingMdxReference("Story", true);
          return _jsxs(_Fragment, {
            children: [_jsx(_components.h1, {
              children: "hello"
            }), "\\n", _jsx(Meta, {
              title: "foobar"
            }), "\\n", _jsxs(_components.p, {
              children: ["world ", 2 + 1]
            }), "\\n", _jsx(Story, {
              name: "foo",
              children: "bar"
            })]
          });
        }
      }
      function _missingMdxReference(id, component) {
        throw new Error("Expected " + (component ? "component" : "object") + " \`" + id + "\` to be defined: you likely forgot to import, pass, or provide it.");
      }
      // =========
      export const foo = () => (
                "bar"
              );
      foo.storyName = 'foo';
      foo.parameters = { storySource: { source: '\\"bar\\"' } };

      const componentMeta = { title: 'foobar', includeStories: ["foo"],  };

      const mdxStoryNameToKey = {"foo":"foo"};

      componentMeta.parameters = componentMeta.parameters || {};
      componentMeta.parameters.docs = {
        ...(componentMeta.parameters.docs || {}),
        page: () => <AddContext mdxStoryNameToKey={mdxStoryNameToKey} mdxComponentAnnotations={componentMeta}><MDXContent /></AddContext>,
      };

      export default componentMeta;
    `);
  });
  it('standalone jsx expressions', () => {
    expect(clean((0, _tsDedent.dedent)`
        # Standalone JSX expressions

        {3 + 3}
      `)).toMatchInlineSnapshot(`
      const componentMeta = { includeStories: [] };

      const mdxStoryNameToKey = {};
    `);
  });
});
describe('docs-mdx-compiler-plugin', () => {
  it('component-args.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Button" args={{ a: 1, b: 2 }} argTypes={{ a: { name: 'A' }, b: { name: 'B' } }} />

        # Args

        <Story name="component notes">
          <Button>Component notes</Button>
        </Story>
      `)).toMatchInlineSnapshot(`
      export const componentNotes = () => <Button>{'Component notes'}</Button>;
      componentNotes.storyName = 'component notes';
      componentNotes.parameters = { storySource: { source: '<Button>{"Component notes"}</Button>' } };

      const componentMeta = {
        title: 'Button',
        args: {
          a: 1,
          b: 2,
        },
        argTypes: {
          a: {
            name: 'A',
          },
          b: {
            name: 'B',
          },
        },
        includeStories: ['componentNotes'],
      };

      const mdxStoryNameToKey = { 'component notes': 'componentNotes' };
    `);
  });
  it('component-id.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';
        
        <Meta title="Button" component={Button} id="button-id" />
        
        <Story name="component notes">
          <Button>Component notes</Button>
        </Story>        
      `)).toMatchInlineSnapshot(`
      export const componentNotes = () => <Button>{'Component notes'}</Button>;
      componentNotes.storyName = 'component notes';
      componentNotes.parameters = { storySource: { source: '<Button>{"Component notes"}</Button>' } };

      const componentMeta = {
        title: 'Button',
        id: 'button-id',
        component: Button,
        includeStories: ['componentNotes'],
      };

      const mdxStoryNameToKey = { 'component notes': 'componentNotes' };
    `);
  });
  it('csf-imports.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Story, Meta, Canvas } from '@storybook/addon-docs';
        import { Welcome, Button } from '@storybook/angular/demo';
        import * as MyStories from './My.stories';
        import { Other } from './Other.stories';
        
        <Meta title="MDX/CSF imports" />
        
        # Stories from CSF imports
        
        <Story story={MyStories.Basic} />
        
        <Canvas>
          <Story story={Other} />
        </Canvas>
        
        <Story name="renamed" story={MyStories.Foo} />      
      `)).toMatchInlineSnapshot(`
      export const _Basic_ = MyStories.Basic;

      export const _Other_ = Other;

      export const _Foo_ = MyStories.Foo;
      _Foo_.storyName = 'renamed';

      const componentMeta = { title: 'MDX/CSF imports', includeStories: ['_Basic_', '_Other_', '_Foo_'] };

      const mdxStoryNameToKey = { _Basic_: '_Basic_', _Other_: '_Other_', renamed: '_Foo_' };
    `);
  });
  it('decorators.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta
          title="Button"
          decorators={[(storyFn) => <div style={{ backgroundColor: 'yellow' }}>{storyFn()}</div>]}
        />

        # Decorated story

        <Story name="one" decorators={[(storyFn) => <div className="local">{storyFn()}</div>]}>
          <Button>One</Button>
        </Story>
      `)).toMatchInlineSnapshot(`
      export const one = () => <Button>{'One'}</Button>;
      one.storyName = 'one';
      one.parameters = { storySource: { source: '<Button>{"One"}</Button>' } };
      one.decorators = [(storyFn) => <div className="local">{storyFn()}</div>];

      const componentMeta = {
        title: 'Button',
        decorators: [
          (storyFn) => (
            <div
              style={{
                backgroundColor: 'yellow',
              }}
            >
              {storyFn()}
            </div>
          ),
        ],
        includeStories: ['one'],
      };

      const mdxStoryNameToKey = { one: 'one' };
    `);
  });
  it('docs-only.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Meta } from '@storybook/addon-docs';

        <Meta title="docs-only" />

        # Documentation only

        This is a documentation-only MDX file which cleans a dummy 'docsOnly: true' story.
      `)).toMatchInlineSnapshot(`
      export const __page = () => {
        throw new Error('Docs-only story');
      };

      __page.parameters = { docsOnly: true };

      const componentMeta = { title: 'docs-only', includeStories: ['__page'] };

      const mdxStoryNameToKey = {};
    `);
  });
  it('loaders.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Button" loaders={[async () => ({ foo: 1 })]} />

        # Story with loader

        <Story name="one" loaders={[async () => ({ bar: 2 })]}>
          <Button>One</Button>
        </Story>
      `)).toMatchInlineSnapshot(`
      export const one = () => <Button>{'One'}</Button>;
      one.storyName = 'one';
      one.parameters = { storySource: { source: '<Button>{"One"}</Button>' } };
      one.loaders = [
        async () => ({
          bar: 2,
        }),
      ];

      const componentMeta = {
        title: 'Button',
        loaders: [
          async () => ({
            foo: 1,
          }),
        ],
        includeStories: ['one'],
      };

      const mdxStoryNameToKey = { one: 'one' };
    `);
  });
  it('meta-quotes-in-title.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Meta } from '@storybook/addon-docs';

        <Meta title="Addons/Docs/what's in a title?" />
      `)).toMatchInlineSnapshot(`
      export const __page = () => {
        throw new Error('Docs-only story');
      };

      __page.parameters = { docsOnly: true };

      const componentMeta = { title: "Addons/Docs/what's in a title?", includeStories: ['__page'] };

      const mdxStoryNameToKey = {};
    `);
  });
  it('non-story-exports.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Button" />

        # Story definition

        <Story name="one">
          <Button>One</Button>
        </Story>

        export const two = 2;

        <Story name="hello story">
          <Button>Hello button</Button>
        </Story>
      `)).toMatchInlineSnapshot(`
      export const one = () => <Button>{'One'}</Button>;
      one.storyName = 'one';
      one.parameters = { storySource: { source: '<Button>{"One"}</Button>' } };

      export const helloStory = () => <Button>{'Hello button'}</Button>;
      helloStory.storyName = 'hello story';
      helloStory.parameters = { storySource: { source: '<Button>{"Hello button"}</Button>' } };

      const componentMeta = { title: 'Button', includeStories: ['one', 'helloStory'] };

      const mdxStoryNameToKey = { one: 'one', 'hello story': 'helloStory' };
    `);
  });
  it('parameters.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Button" component={Button} parameters={{ notes: 'component notes' }} />

        <Story name="component notes">
          <Button>Component notes</Button>
        </Story>

        <Story name="story notes" parameters={{ notes: 'story notes' }}>
          <Button>Story notes</Button>
        </Story>
      `)).toMatchInlineSnapshot(`
      export const componentNotes = () => <Button>{'Component notes'}</Button>;
      componentNotes.storyName = 'component notes';
      componentNotes.parameters = { storySource: { source: '<Button>{"Component notes"}</Button>' } };

      export const storyNotes = () => <Button>{'Story notes'}</Button>;
      storyNotes.storyName = 'story notes';
      storyNotes.parameters = {
        storySource: { source: '<Button>{"Story notes"}</Button>' },
        ...{
          notes: 'story notes',
        },
      };

      const componentMeta = {
        title: 'Button',
        parameters: {
          notes: 'component notes',
        },
        component: Button,
        includeStories: ['componentNotes', 'storyNotes'],
      };

      const mdxStoryNameToKey = { 'component notes': 'componentNotes', 'story notes': 'storyNotes' };
    `);
  });
  it('previews.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Canvas, Story, Meta } from '@storybook/addon-docs';

        <Meta title="Button" component={Button} parameters={{ notes: 'component notes' }} />

        # Canvas

        Canvases can contain normal components, stories, and story references

        <Canvas>
          <Button>Just a button</Button>
          <Story name="hello button">
            <Button>Hello button</Button>
          </Story>
          <Story name="two">
            <Button>Two</Button>
          </Story>
          <Story id="welcome--welcome" />
        </Canvas>

        Canvas without a story

        <Canvas>
          <Button>Just a button</Button>
        </Canvas>
      `)).toMatchInlineSnapshot(`
      export const helloButton = () => <Button>{'Hello button'}</Button>;
      helloButton.storyName = 'hello button';
      helloButton.parameters = { storySource: { source: '<Button>{"Hello button"}</Button>' } };

      export const two = () => <Button>{'Two'}</Button>;
      two.storyName = 'two';
      two.parameters = { storySource: { source: '<Button>{"Two"}</Button>' } };

      const componentMeta = {
        title: 'Button',
        parameters: {
          notes: 'component notes',
        },
        component: Button,
        includeStories: ['helloButton', 'two'],
      };

      const mdxStoryNameToKey = { 'hello button': 'helloButton', two: 'two' };
    `);
  });
  it('story-args.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Button" />

        # Args

        export const Template = (args) => <Button>Component notes</Button>;

        <Story
          name="component notes"
          args={{ a: 1, b: 2 }}
          argTypes={{ a: { name: 'A' }, b: { name: 'B' } }}
        >
          {Template.bind({})}
        </Story>
      `)).toMatchInlineSnapshot(`
      export const componentNotes = Template.bind({});
      componentNotes.storyName = 'component notes';
      componentNotes.argTypes = {
        a: {
          name: 'A',
        },
        b: {
          name: 'B',
        },
      };
      componentNotes.args = {
        a: 1,
        b: 2,
      };
      componentNotes.parameters = { storySource: { source: 'args => <Button>Component notes</Button>' } };

      const componentMeta = { title: 'Button', includeStories: ['componentNotes'] };

      const mdxStoryNameToKey = { 'component notes': 'componentNotes' };
    `);
  });
  it('story-current.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Story } from '@storybook/addon-docs';

        # Current story

        <Story id="." />
      `)).toMatchInlineSnapshot(`
      const componentMeta = { includeStories: [] };

      const mdxStoryNameToKey = {};
    `);
  });
  it('story-def-text-only.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Text" />

        # Story definition

        <Story name="text">Plain text</Story>
      `)).toMatchInlineSnapshot(`
      export const text = () => 'Plain text';
      text.storyName = 'text';
      text.parameters = { storySource: { source: '"Plain text"' } };

      const componentMeta = { title: 'Text', includeStories: ['text'] };

      const mdxStoryNameToKey = { text: 'text' };
    `);
  });
  it('story-definitions.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';
        
        <Meta title="Button" />
        
        # Story definition
        
        <Story name="one">
          <Button>One</Button>
        </Story>
        
        <Story name="hello story">
          <Button>Hello button</Button>
        </Story>
        
        <Story name="w/punctuation">
          <Button>with punctuation</Button>
        </Story>
        
        <Story name="1 fine day">
          <Button>starts with number</Button>
        </Story>
      `)).toMatchInlineSnapshot(`
      export const one = () => <Button>{'One'}</Button>;
      one.storyName = 'one';
      one.parameters = { storySource: { source: '<Button>{"One"}</Button>' } };

      export const helloStory = () => <Button>{'Hello button'}</Button>;
      helloStory.storyName = 'hello story';
      helloStory.parameters = { storySource: { source: '<Button>{"Hello button"}</Button>' } };

      export const wPunctuation = () => <Button>{'with punctuation'}</Button>;
      wPunctuation.storyName = 'w/punctuation';
      wPunctuation.parameters = { storySource: { source: '<Button>{"with punctuation"}</Button>' } };

      export const _1FineDay = () => <Button>{'starts with number'}</Button>;
      _1FineDay.storyName = '1 fine day';
      _1FineDay.parameters = { storySource: { source: '<Button>{"starts with number"}</Button>' } };

      const componentMeta = {
        title: 'Button',
        includeStories: ['one', 'helloStory', 'wPunctuation', '_1FineDay'],
      };

      const mdxStoryNameToKey = {
        one: 'one',
        'hello story': 'helloStory',
        'w/punctuation': 'wPunctuation',
        '1 fine day': '_1FineDay',
      };
    `);
  });
  it('story-function-var.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Meta, Story } from '@storybook/addon-docs';

        <Meta title="story-function-var" />
        
        export const basicFn = () => <Button />;
        
        # Button
        
        I can define a story with the function defined in CSF:
        
        <Story name="basic">{basicFn}</Story>      
      `)).toMatchInlineSnapshot(`
      export const basic = assertIsFn(basicFn);
      basic.storyName = 'basic';
      basic.parameters = { storySource: { source: 'basicFn' } };

      const componentMeta = { title: 'story-function-var', includeStories: ['basic'] };

      const mdxStoryNameToKey = { basic: 'basic' };
    `);
  });
  it('story-function.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        <Story name="function" height="100px">
          {() => {
            const btn = document.createElement('button');
            btn.innerHTML = 'Hello Button';
            btn.addEventListener('click', action('Click'));
            return btn;
          }}
        </Story>
      `)).toMatchInlineSnapshot(`
      export const functionStory = () => {
        const btn = document.createElement('button');
        btn.innerHTML = 'Hello Button';
        btn.addEventListener('click', action('Click'));
        return btn;
      };
      functionStory.storyName = 'function';
      functionStory.parameters = {
        storySource: {
          source:
            '() => {\\n  const btn = document.createElement("button");\\n  btn.innerHTML = "Hello Button";\\n  btn.addEventListener("click", action("Click"));\\n  return btn;\\n}',
        },
      };

      const componentMeta = { includeStories: ['functionStory'] };

      const mdxStoryNameToKey = { function: 'functionStory' };
    `);
  });
  it('story-multiple-children.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Multiple" />
        
        # Multiple children
        
        <Story name="multiple children">
          <p>Hello Child #1</p>
          <p>Hello Child #2</p>
        </Story>
      `)).toMatchInlineSnapshot(`
      export const multipleChildren = () => (
        <>
          <p>{'Hello Child #1'}</p>
          "\\n"
          <p>{'Hello Child #2'}</p>
        </>
      );
      multipleChildren.storyName = 'multiple children';
      multipleChildren.parameters = {
        storySource: { source: '<p>{"Hello Child #1"}</p>\\n"\\\\n"\\n<p>{"Hello Child #2"}</p>' },
      };

      const componentMeta = { title: 'Multiple', includeStories: ['multipleChildren'] };

      const mdxStoryNameToKey = { 'multiple children': 'multipleChildren' };
    `);
  });
  it('story-object.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Story, Meta } from '@storybook/addon-docs';
        import { Welcome, Button } from '@storybook/angular/demo';
        import { linkTo } from '@storybook/addon-links';
        
        <Meta title="MDX|Welcome" />
        
        # Story object
        
        <Story name="to storybook" height="300px">
          {{
            template: '<storybook-welcome-component (showApp)="showApp()"></storybook-welcome-component>',
            props: {
              showApp: linkTo('Button'),
            },
            moduleMetadata: {
              declarations: [Welcome],
            },
          }}
        </Story>
      `)).toMatchInlineSnapshot(`
      export const toStorybook = () => ({
        template: '<storybook-welcome-component (showApp)="showApp()"></storybook-welcome-component>',
        props: {
          showApp: linkTo('Button'),
        },
        moduleMetadata: {
          declarations: [Welcome],
        },
      });
      toStorybook.storyName = 'to storybook';
      toStorybook.parameters = {
        storySource: {
          source:
            '{\\n  template: "<storybook-welcome-component (showApp)=\\\\"showApp()\\\\"></storybook-welcome-component>",\\n  props: {\\n    showApp: linkTo("Button")\\n  },\\n  moduleMetadata: {\\n    declarations: [Welcome]\\n  }\\n}',
        },
      };

      const componentMeta = { title: 'MDX|Welcome', includeStories: ['toStorybook'] };

      const mdxStoryNameToKey = { 'to storybook': 'toStorybook' };
    `);
  });
  it('story-references.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Story } from '@storybook/addon-docs';

        # Story reference

        <Story id="welcome--welcome" />
      `)).toMatchInlineSnapshot(`
      const componentMeta = { includeStories: [] };

      const mdxStoryNameToKey = {};
    `);
  });
  it('title-template-string.mdx', () => {
    expect(clean(["import { Meta, Story } from '@storybook/addon-docs';", "import { titleFunction } from '../title-generators';", '', // eslint-disable-next-line no-template-curly-in-string
    "<Meta title={`${titleFunction('template')}`} />"].join('\n'))).toMatchInlineSnapshot(`
      export const __page = () => {
        throw new Error('Docs-only story');
      };

      __page.parameters = { docsOnly: true };

      const componentMeta = { title: \`\${titleFunction('template')}\`, includeStories: ['__page'] };

      const mdxStoryNameToKey = {};
    `);
  });
  it('vanilla.mdx', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';

        # Hello MDX

        This is some random content.

        <Button>Hello button</Button>
      `)).toMatchInlineSnapshot(`
      const componentMeta = { includeStories: [] };

      const mdxStoryNameToKey = {};
    `);
  });
  it('errors on missing story props', async () => {
    await expect(async () => clean((0, _tsDedent.dedent)`
        import { Button } from '@storybook/react/demo';
        import { Story, Meta } from '@storybook/addon-docs';

        <Meta title="Button" />

        # Bad story

        <Story>
          <Button>One</Button>
        </Story>      
      `)).rejects.toThrow('Expected a Story name, id, or story attribute');
  });
  describe('csf3', () => {
    it('auto-title-docs-only.mdx', () => {
      expect(clean((0, _tsDedent.dedent)`
          import { Meta } from '@storybook/addon-docs';
  
          <Meta />
  
          # Auto-title Docs Only

          Spme **markdown** here!
        `)).toMatchInlineSnapshot(`
        export const __page = () => {
          throw new Error('Docs-only story');
        };

        __page.parameters = { docsOnly: true };

        const componentMeta = { includeStories: ['__page'] };

        const mdxStoryNameToKey = {};
      `);
    });
    it('auto-title.mdx', () => {
      expect(clean((0, _tsDedent.dedent)`
          import { Button } from '@storybook/react/demo';
          import { Story, Meta } from '@storybook/addon-docs';

          <Meta component={Button} />

          <Story name="Basic">
            <Button>Basic</Button>
          </Story>
        `)).toMatchInlineSnapshot(`
        export const basic = () => <Button>{'Basic'}</Button>;
        basic.storyName = 'Basic';
        basic.parameters = { storySource: { source: '<Button>{"Basic"}</Button>' } };

        const componentMeta = { component: Button, includeStories: ['basic'] };

        const mdxStoryNameToKey = { Basic: 'basic' };
      `);
    });
    it('default-render.mdx', () => {
      expect(clean((0, _tsDedent.dedent)`
          import { Button } from '@storybook/react/demo';
          import { Story, Meta } from '@storybook/addon-docs';

          <Meta title="Button" component={Button} />

          <Story name="Basic" />
        `)).toMatchInlineSnapshot(`
        export const basic = {};
        basic.storyName = 'Basic';
        basic.parameters = { storySource: { source: '{}' } };

        const componentMeta = { title: 'Button', component: Button, includeStories: ['basic'] };

        const mdxStoryNameToKey = { Basic: 'basic' };
      `);
    });
    it('component-render.mdx', () => {
      expect(clean((0, _tsDedent.dedent)`
          import { Button } from '@storybook/react/demo';
          import { Story, Meta } from '@storybook/addon-docs';

          <Meta title="Button" component={Button} render={(args) => <Button {...args} />} />

          <Story name="Basic" />
        `)).toMatchInlineSnapshot(`
        export const basic = {};
        basic.storyName = 'Basic';
        basic.parameters = { storySource: { source: '{}' } };

        const componentMeta = {
          title: 'Button',
          component: Button,
          render: (args) => <Button {...args} />,
          includeStories: ['basic'],
        };

        const mdxStoryNameToKey = { Basic: 'basic' };
      `);
    });
    it('story-render.mdx', () => {
      expect(clean((0, _tsDedent.dedent)`
          import { Button } from '@storybook/react/demo';
          import { Story, Meta } from '@storybook/addon-docs';

          <Meta title="Button" component={Button} />

          <Story name="Basic" render={(args) => <Button {...args} />} />
        `)).toMatchInlineSnapshot(`
        export const basic = {};
        basic.storyName = 'Basic';
        basic.parameters = { storySource: { source: '{}' } };
        basic.render = (args) => <Button {...args} />;

        const componentMeta = { title: 'Button', component: Button, includeStories: ['basic'] };

        const mdxStoryNameToKey = { Basic: 'basic' };
      `);
    });
    it('story-play.mdx', () => {
      expect(clean((0, _tsDedent.dedent)`
          import { Button } from '@storybook/react/demo';
          import { Story, Meta } from '@storybook/addon-docs';

          <Meta title="Button" component={Button} />

          <Story name="Basic" play={() => console.log('play')} />
        `)).toMatchInlineSnapshot(`
        export const basic = {};
        basic.storyName = 'Basic';
        basic.parameters = { storySource: { source: '{}' } };
        basic.play = () => console.log('play');

        const componentMeta = { title: 'Button', component: Button, includeStories: ['basic'] };

        const mdxStoryNameToKey = { Basic: 'basic' };
      `);
    });
  });
  it('style tag', () => {
    expect(clean((0, _tsDedent.dedent)`
        import { Meta } from '@storybook/addon-docs';

        <Meta title="Example/Introduction" />

        <style>{\`
          .subheading {
            --mediumdark: '#999999';
            font-weight: 900;
            font-size: 13px;
            color: #999;
            letter-spacing: 6px;
            line-height: 24px;
            text-transform: uppercase;
            margin-bottom: 12px;
            margin-top: 40px;
          }
          .link-list {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
            row-gap: 10px;
          }
        \`}</style>
      `)).toMatchInlineSnapshot(`
      export const __page = () => {
        throw new Error('Docs-only story');
      };

      __page.parameters = { docsOnly: true };

      const componentMeta = { title: 'Example/Introduction', includeStories: ['__page'] };

      const mdxStoryNameToKey = {};
    `);
  });
});