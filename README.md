# gulp-remove-empty-lines-html

A Gulp plugin that removes empty lines and lines containing only whitespace from HTML files.

## Installation

```bash
npm install gulp-remove-empty-lines-html --save-dev
```

## Usage

```javascript
const gulp = require('gulp');
const removeEmptyLines = require('gulp-remove-empty-lines-html');

gulp.task('clean-html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(removeEmptyLines())
    .pipe(gulp.dest('./dist'));
});
```

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