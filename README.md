# gulp-remove-empty-lines-html

A Gulp plugin that removes empty lines, HTML comments, and formats HTML with proper indentation. It also removes trailing spaces after closing tags.

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
const removeEmptyLines = require('gulp-remove-empty-lines-html');

gulp.task('clean-html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(removeEmptyLines())
    .pipe(gulp.dest('./dist'));
});
```

### ESM Example

```javascript
import { src, dest } from 'gulp';
import removeEmptyLines from 'gulp-remove-empty-lines-html';

export function cleanHtml() {
  return src('./src/**/*.html')
    .pipe(removeEmptyLines())
    .pipe(dest('./dist'));
}
```

## Options

***removeComments***  
Default: true   
Type: boolean  
Description: Remove all HTML comments from files.    

## Features

- Removes empty lines and lines containing only whitespace
- Removes HTML comments (when `removeComments` is true)
- Removes trailing spaces after closing tags
- Formats HTML with proper indentation (2 spaces)
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
    <h1>
      Hello World
    </h1>
    <p>
      This is a test
    </p>
  </body>

</html>
```

Output:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Test</title>
    <meta name="description" content="Page description">
  </head>
  <body>
    <h1>
      Hello World
    </h1>
    <p>
      This is a test
    </p>
  </body>
</html>
```

## License

MIT