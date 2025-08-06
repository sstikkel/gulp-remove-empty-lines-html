var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  removeEmptyLinesHtml: () => removeEmptyLinesHtml
});
module.exports = __toCommonJS(index_exports);
var import_through2 = __toESM(require("through2"), 1);
var import_plugin_error = __toESM(require("plugin-error"), 1);
var PLUGIN_NAME = "gulp-remove-empty-lines-html";
function clean(fileContent, options) {
  fileContent = fileContent.toString() || "";
  options = { removeComments: false, ...options };
  if (fileContent === null || fileContent === "") {
    return "";
  }
  if (options.removeComments) {
    fileContent = fileContent.replace(/<!--[\s\S]*?-->/gm, "");
  }
  const lines = fileContent.split("\n");
  const filteredLines = lines.filter((line) => line.trim() !== "");
  return filteredLines.join("\n");
}
function removeEmptyLinesHtml(options) {
  options = options || {};
  return import_through2.default.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit("error", new import_plugin_error.default(PLUGIN_NAME, "Streaming not supported"));
      return cb();
    }
    try {
      const fileExtension = file.path.split(".").pop().toLowerCase();
      if (fileExtension !== "html") {
        this.emit("error", new import_plugin_error.default(PLUGIN_NAME, "Only HTML files are supported"));
        return cb();
      }
      file.contents = Buffer.from(clean(file.contents, options));
    } catch (err) {
      this.emit("error", new import_plugin_error.default(PLUGIN_NAME, err));
    }
    this.push(file);
    return cb();
  });
}
var index_default = removeEmptyLinesHtml;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeEmptyLinesHtml
});
