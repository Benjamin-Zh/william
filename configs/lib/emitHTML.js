const fs = require('fs');
const path = require('path');
const v = require('voca');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { APP_MODE } = require('../../constants');
const { SRC_PATH } = require('../../constants/paths');


function createInstance({
  title,
  filename,
  template,
  chunks,
}) {
  const options = { title, filename };

  if (chunks) options.chunks = chunks;

  // check if specific template is exist,
  // if it's not, use html-webpack-plugin's default template.
  try {
    const templatePath = path.resolve(SRC_PATH, template);

    fs.accessSync(templatePath);
    options.template = templatePath;
  } catch (err) {
    options.template = require.resolve('html-webpack-plugin/default_index.ejs');
  }

  return new HTMLWebpackPlugin(options);
}

module.exports = ({ pages, appMode }) => {
  let plugins;

  // sp
  if (appMode === APP_MODE.SP) {
    plugins = [createInstance({
      title: 'App',
      filename: 'index.html',
      template: path.resolve(SRC_PATH, 'index.html'),
    })];
  }

  // mp
  if (appMode === APP_MODE.MP) {
    plugins = pages.map(page => createInstance({
      title: v.capitalize(page.name),
      filename: `${page.name}.html`,
      template: path.resolve(page.path, `${page.name}.html`),
      chunks: [page.name],
    }));
  }

  return { plugins };
};
