const { getOptions } = require('loader-utils');
const { compile } = require('./compiler');

const DEFAULT_RENDERER = `
import React from 'react';
`;

// Lifted from MDXv1 loader
// https://github.com/mdx-js/mdx/blob/v1/packages/loader/index.js
//
// Added
// - webpack5 support
// - MDX compiler built in
const loader = async function (content) {
  const callback = this.async();
  // this.getOptions() is webpack5 only
  const queryOptions = this.getOptions ? this.getOptions() : getOptions(this);
  const options = Object.assign({}, queryOptions, {
    filepath: this.resourcePath,
  });

  let result;
  try {
    result = await compile(content, options);
  } catch (err) {
    return callback(err);
  }

  const code = `${DEFAULT_RENDERER}\n${result}`;
  return callback(null, code);
};

module.exports = loader;
