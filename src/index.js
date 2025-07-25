import through from 'through2';
import PluginError from 'plugin-error';

const PLUGIN_NAME = 'gulp-remove-empty-lines-html';

function clean(fileContent, options) {
  fileContent = fileContent.toString().trim() || '';
  options = { removeComments: true, ...options };

  if (fileContent === null || fileContent === '') {
    return '';
  }

  if (options.removeComments) {
    fileContent = fileContent.replace(/<!--[\s\S]*?-->/gm, '');
  }

  // Always remove spaces (not newlines) immediately after every closing tag
  fileContent = fileContent.replace(/> +/g, '>');

  // Return fileContent.replace(/^\s*[\r\n]/gm, '');
  return fileContent
    .split('\n')
    .map(line => (line.trim() === '' ? '' : line))
    .filter(line => line !== '')
    .join('\n');
}

function removeEmptyLinesHtml(options) {
  options = options || {};

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    try {
      const fileExtension = file.path.split('.').pop().toLowerCase();
      if (fileExtension !== 'html') {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Only HTML files are supported'));
        return cb();
      }

      file.contents = Buffer.from(clean(file.contents, options));
    } catch (err) {
      this.emit('error', new PluginError(PLUGIN_NAME, err));
    }

    this.push(file);
    return cb();
  });
}

export default removeEmptyLinesHtml;
export { removeEmptyLinesHtml };
