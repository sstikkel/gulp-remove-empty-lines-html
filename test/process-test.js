// test/process-test.js
import gulp from 'gulp';
import removeEmptyLinesHtml from '../dist/index.mjs';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Process the test.html file
async function processTestHtml() {
  console.log('Processing test.html with the plugin...');
  
  // Create a temporary directory for output
  const tempDir = path.join(os.tmpdir(), 'gulp-remove-empty-lines-test');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  return gulp.src('test/test.html')
    .pipe(removeEmptyLinesHtml())
    .pipe(gulp.dest(tempDir))
    .on('end', () => {
      console.log('✅ Processing complete!');
      console.log(`Output saved to: ${tempDir}/test.html`);
      
      // Read and display the processed content
      const processedContent = fs.readFileSync(path.join(tempDir, 'test.html'), 'utf8');
      console.log('\nProcessed content:');
      console.log('---START---');
      console.log(processedContent);
      console.log('---END---');
      
      // Clean up temporary directory
      fs.rmSync(tempDir, { recursive: true, force: true });
    });
}

processTestHtml().catch(console.error); 