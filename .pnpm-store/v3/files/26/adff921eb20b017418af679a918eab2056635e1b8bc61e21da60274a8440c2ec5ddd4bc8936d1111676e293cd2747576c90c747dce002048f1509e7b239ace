import * as t from '@babel/types';
export interface CompilerOptions {
    filepath?: string;
}
export interface Context {
    counter: number;
    namedExports: Record<string, any>;
    storyNameToKey: Record<string, string>;
}
export declare type MetaExport = Record<string, any>;
export declare function genStoryExport(ast: t.JSXElement, context: Context): {
    [x: string]: string;
};
export declare function genCanvasExports(ast: t.JSXElement, context: Context): {};
export declare function genMeta(ast: t.JSXElement, options: CompilerOptions): {
    title: string;
    id: string;
    parameters: string;
    decorators: string;
    loaders: string;
    component: string;
    subcomponents: string;
    args: string;
    argTypes: string;
    render: string;
};
export declare const wrapperJs: string;
export declare function stringifyMeta(meta: object): string;
