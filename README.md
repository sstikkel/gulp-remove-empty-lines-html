# gulp-remove-empty-lines-html

A Gulp plugin that removes empty lines from HTML files and optionally removes HTML comments. It preserves the original formatting of the HTML content.

## Module Support

This package supports both CommonJS (`require`) and ESM (`import`) usage. Node.js >=22 is required.

## Installation

```bash
npm install gulp-remove-empty-lines-html --save-dev
```

## Usage

### CommonJS Example

```javascript
const { src, dest } = require('gulp');
const { removeEmptyLinesHtml } = require('gulp-remove-empty-lines-html');

gulp.task('clean-html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(removeEmptyLinesHtml())
    .pipe(gulp.dest('./dist'));
});
```

### ESM Example

```javascript
import { src, dest } from 'gulp';
import removeEmptyLinesHtml from 'gulp-remove-empty-lines-html';

export function cleanHtml() {
  return src('./src/**/*.html')
    .pipe(removeEmptyLinesHtml())
    .pipe(dest('./dist'));
}
```

## Options

***removeComments***  
Default: false   
Type: boolean  
Description: Remove all HTML comments from files.    

## Features

- Removes empty lines and lines containing only whitespace
- Optionally removes HTML comments (when `removeComments` is true)
- Preserves original HTML formatting and indentation
- Only processes HTML files (`.html` extension)

## Requirements

- Node.js >=22

## Example

Input:
```html
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title>Test</title>
    <meta name="description" content="Page description">
  </head>

  <body>
    <!-- This is a comment -->
    <h1>Hello World</h1>
      <p>
        This is a test
      </p>
  </body>

</html>
```

Output (default):
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Test</title>
    <meta name="description" content="Page description">
  </head>
  <body>
    <!-- This is a comment -->
    <h1>Hello World</h1>
      <p>
        This is a test
      </p>
  </body>
</html>
```

Output (with `removeComments: true`):
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Test</title>
    <meta name="description" content="Page description">
  </head>
  <body>
    <h1>Hello World</h1>
      <p>
        This is a test
      </p>
  </body>
</html>
```

## License

MIT