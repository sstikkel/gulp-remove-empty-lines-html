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

  // Remove empty lines first
  const lines = fileContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  // Parse and format HTML with proper indentation
  const formattedLines = [];
  let indentLevel = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle DOCTYPE
    if (line.startsWith('<!DOCTYPE')) {
      formattedLines.push(line);
      continue;
    }
    
    // Handle closing tags
    if (line.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1);
      const indent = '  '.repeat(indentLevel);
      formattedLines.push(indent + line);
      continue;
    }
    
    // Handle opening tags
    if (line.startsWith('<') && !line.startsWith('<!')) {
      const indent = '  '.repeat(indentLevel);
      
      // Check if it's a self-closing tag or has content
      if (line.endsWith('/>') || line.includes('>') && !line.includes('</')) {
        // Self-closing tag or tag with content on same line
        formattedLines.push(indent + line);
      } else {
        // Opening tag - add it and increase indent
        formattedLines.push(indent + line);
        indentLevel++;
        
        // Check if next line is content (not a tag)
        if (i + 1 < lines.length && !lines[i + 1].startsWith('<')) {
          const contentIndent = '  '.repeat(indentLevel);
          formattedLines.push(contentIndent + lines[i + 1]);
          i++; // Skip the content line in next iteration
        }
      }
      continue;
    }
    
    // Handle content (non-tag lines)
    const indent = '  '.repeat(indentLevel);
    formattedLines.push(indent + line);
  }
  
  return formattedLines.join('\n');
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
