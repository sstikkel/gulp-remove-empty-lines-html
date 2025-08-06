// test/process-test.js
import gulp from 'gulp';
import removeEmptyLinesHtml from '../dist/index.mjs';
import fs from 'fs';

// Process the test.html file
async function processTestHtml() {
  console.log('Processing test.html with the plugin...');
  
  return gulp.src('test/test.html')
    .pipe(removeEmptyLinesHtml())
    .pipe(gulp.dest('test/output'))
    .on('end', () => {
      console.log('✅ Processing complete!');
      console.log('Output saved to: test/output/test.html');
      
      // Read and display the processed content
      const processedContent = fs.readFileSync('test/output/test.html', 'utf8');
      console.log('\nProcessed content:');
      console.log('---START---');
      console.log(processedContent);
      console.log('---END---');
    });
}

processTestHtml().catch(console.error); 