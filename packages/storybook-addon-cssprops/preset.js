function managerEntries(entry = [], options) {
  return [...entry, require.resolve('./dist/esm/register')];
}

module.exports = { managerEntries };
