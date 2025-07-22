# gulp-remove-empty-lines-html

A Gulp plugin that removes empty lines and lines containing only whitespace from HTML files only.

## Module Support

This package supports both CommonJS (`require`) and ESM (`import`) usage. Node.js >=22 is required.

### CommonJS Example

## Installation

```bash
npm install gulp-remove-empty-lines-html --save-dev
```

## Usage

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
Description: Remove all the comments from html files.    

## Requirements

- Node.js >=22

## Example

Input:
```html
<html>

  <head>
    
  </head>

  <body>
    
    <h1>Hello</h1>

  </body>

</html>
```

Output:
```html
<html>
  <head>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

## License

MIT