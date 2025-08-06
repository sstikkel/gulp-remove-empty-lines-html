import through from 'through2';
import PluginError from 'plugin-error';

const PLUGIN_NAME = 'gulp-remove-empty-lines-html';

function clean(fileContent, options) {
  fileContent = fileContent.toString() || '';
  options = { removeComments: false, ...options };

  if (fileContent === null || fileContent === '') {
    return '';
  }

  // Remove HTML comments if the option is enabled
  if (options.removeComments) {
    fileContent = fileContent.replace(/<!--[\s\S]*?-->/gm, '');
  }

  // Split into lines and remove completely empty lines (lines with only whitespace)
  const lines = fileContent.split('\n');
  const filteredLines = lines.filter(line => line.trim() !== '');
  
  // Join the lines back together, preserving the original formatting of non-empty lines
  return filteredLines.join('\n');
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
