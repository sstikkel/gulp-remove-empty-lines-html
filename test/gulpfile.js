// test/gulpfile.js
import gulp from 'gulp';
import removeEmptyLinesHtml from '../dist/index.mjs';

// Test with actual gulp pipeline - Gulp 5.0.1 syntax
export function testPlugin() {
  return gulp.src('test/fixtures/*.html')
    .pipe(removeEmptyLinesHtml())
    .pipe(gulp.dest('test/output'));
}

export default testPlugin;