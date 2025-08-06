// src/index.js
import through from "through2";
import PluginError from "plugin-error";
var PLUGIN_NAME = "gulp-remove-empty-lines-html";
function clean(fileContent, options) {
  fileContent = fileContent.toString().trim() || "";
  options = { removeComments: true, ...options };
  if (fileContent === null || fileContent === "") {
    return "";
  }
  if (options.removeComments) {
    fileContent = fileContent.replace(/<!--[\s\S]*?-->/gm, "");
  }
  fileContent = fileContent.replace(/> +/g, ">");
  const lines = fileContent.split("\n").map((line) => line.trim()).filter((line) => line !== "");
  const formattedLines = [];
  let indentLevel = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("<!DOCTYPE")) {
      formattedLines.push(line);
      continue;
    }
    if (line.startsWith("</")) {
      indentLevel = Math.max(0, indentLevel - 1);
      const indent2 = "  ".repeat(indentLevel);
      formattedLines.push(indent2 + line);
      continue;
    }
    if (line.startsWith("<") && !line.startsWith("<!")) {
      const indent2 = "  ".repeat(indentLevel);
      if (line.endsWith("/>") || line.includes(">") && !line.includes("</")) {
        formattedLines.push(indent2 + line);
      } else {
        formattedLines.push(indent2 + line);
        indentLevel++;
        if (i + 1 < lines.length && !lines[i + 1].startsWith("<")) {
          const contentIndent = "  ".repeat(indentLevel);
          formattedLines.push(contentIndent + lines[i + 1]);
          i++;
        }
      }
      continue;
    }
    const indent = "  ".repeat(indentLevel);
    formattedLines.push(indent + line);
  }
  return formattedLines.join("\n");
}
function removeEmptyLinesHtml(options) {
  options = options || {};
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit("error", new PluginError(PLUGIN_NAME, "Streaming not supported"));
      return cb();
    }
    try {
      const fileExtension = file.path.split(".").pop().toLowerCase();
      if (fileExtension !== "html") {
        this.emit("error", new PluginError(PLUGIN_NAME, "Only HTML files are supported"));
        return cb();
      }
      file.contents = Buffer.from(clean(file.contents, options));
    } catch (err) {
      this.emit("error", new PluginError(PLUGIN_NAME, err));
    }
    this.push(file);
    return cb();
  });
}
var index_default = removeEmptyLinesHtml;
export {
  index_default as default,
  removeEmptyLinesHtml
};
